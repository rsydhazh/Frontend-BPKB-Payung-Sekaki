"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Heart, Activity, Calendar, Clipboard, LogOut, Loader2, User } from "lucide-react";

// Update Interface agar sesuai dengan hasil JOIN data warga dari dokumentasi baru
interface HistoryKesehatan {
  id: string;
  tensi: string;
  gula_darah: string;
  catatan: string;
  created_at: string;
  warga: {
    nik: string;
    nama_warga: string;
  } | null; // Menampung data relasi profil warga
}

export default function HistoryWargaPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [history, setHistory] = useState<HistoryKesehatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State data pribadi warga yang diambil dari baris rekam medis
  const [profilWarga, setProfilWarga] = useState<{ nama: string; nik: string }>({
    nama: "Warga",
    nik: "-",
  });

  useEffect(() => {
    // 1. Detektor Sinkronisasi Global untuk Tab Ganda Browser
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/kependudukan");
        router.refresh();
      }
    });

    const fetchWargaData = async () => {
      // 2. Cek apakah ada warga yang sedang login
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/warga/login-warga");
        return;
      }

      try {
        // 3. Mengambil riwayat kesehatan + JOIN data warga sesuai update DOKUMENTASI BARU
        // Supabase RLS otomatis memfilter baris yang id_auth-nya cocok dengan user!
        const { data: historyKesehatan, error } = await supabase
          .from("pengecekan_kesehatan")
          .select(`
            id,
            tensi,
            gula_darah,
            catatan,
            created_at,
            warga (
              nik,
              nama_warga
            )
          `)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Gagal mengambil data history:", error.message);
        } else if (historyKesehatan && historyKesehatan.length > 0) {
          setHistory(historyKesehatan as any);
          
          // Ambil informasi nama asli dan NIK dari rekam medis pertama untuk dipajang di banner
          const infoWarga = historyKesehatan[0].warga;
          if (infoWarga) {
            setProfilWarga({
              nama: infoWarga.nama_warga,
              nik: infoWarga.nik,
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWargaData();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/kependudukan"); 
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <Loader2 className="animate-spin text-[#0a1680] mx-auto" size={40} />
          <p className="text-gray-500 text-sm font-medium">Memuat riwayat medis...</p>
        </div>
      </div>
    );
  }

  // Ambil data pemeriksaan paling terakhir untuk card ringkasan atas
  const dataTerbaru = history[0];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Navbar Atas Portal Warga */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0a1680] flex items-center justify-center text-white font-bold">
                W
              </div>
              <span className="font-extrabold text-gray-900 text-md tracking-tight">Portal Layanan Warga</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Banner Selamat Datang - Sekarang Keren Menampilkan Nama Asli & NIK Warga */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Selamat Datang, {profilWarga.nama}!</h1>
            <p className="text-gray-500 text-sm mt-1">
              Data medis Anda otomatis disinkronkan berdasarkan NIK.
            </p>
          </div>
          <div className="bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 flex items-center gap-2 self-start sm:self-center">
            <User size={16} className="text-[#0a1680]" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">NIK:</span>
            <span className="text-sm font-bold text-gray-700 tracking-wide">{profilWarga.nik}</span>
          </div>
        </div>

        {/* Ringkasan Kondisi Terakhir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-red-50 rounded-2xl text-red-500">
              <Heart size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tensi Darah Terakhir</p>
              <p className="text-2xl font-black text-gray-800 mt-1">{dataTerbaru ? dataTerbaru.tensi : "-"}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-500">
              <Activity size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gula Darah Terakhir</p>
              <p className="text-2xl font-black text-gray-800 mt-1">{dataTerbaru ? dataTerbaru.gula_darah : "-"}</p>
            </div>
          </div>
        </div>

        {/* Tabel Riwayat Rekam Medis */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-2">
            <Clipboard size={18} className="text-[#0a1680]" />
            <h2 className="font-extrabold text-gray-800">Riwayat Rekam Medis Berkala</h2>
          </div>
          
          <div className="overflow-x-auto">
            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm font-medium">
                Belum ada data riwayat pengecekan kesehatan.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/60 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={14}/> Tanggal Periksa
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tensi Darah</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Gula Darah</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Catatan Petugas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-gray-700">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-bold">{item.tensi}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">{item.gula_darah}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium max-w-xs truncate" title={item.catatan}>
                        {item.catatan || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}