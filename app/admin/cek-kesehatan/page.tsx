"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FiActivity, FiSearch, FiCalendar, FiHeart, FiDroplet, FiUser, FiInfo, FiTrendingUp } from "react-icons/fi";
import { Loader2 } from "lucide-react";
// Import Recharts untuk visualisasi data klinis
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

// Interface data join dari database
interface PengecekanKesehatanAdmin {
  id: string;
  tensi: string;
  gula_darah: string;
  catatan: string;
  created_at: string;
  warga: {
    nik: string;
    nama_warga: string;
    email: string;
  } | null;
}

export default function AdminCekKesehatanPage() {
  const supabase = createClientComponentClient();
  
  const [dataMedis, setDataMedis] = useState<PengecekanKesehatanAdmin[]>([]);
  const [filteredData, setFilteredData] = useState<PengecekanKesehatanAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk data grafik
  const [dataTrenBulanan, setDataTrenBulanan] = useState<any[]>([]);
  const [dataStatusKategori, setDataStatusKategori] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllDataKesehatan = async () => {
      try {
        setIsLoading(true);
        
        // Mengambil semua data pemeriksaan + JOIN profil warga
        const { data, error } = await supabase
          .from("pengecekan_kesehatan")
          .select(`
            id,
            tensi,
            gula_darah,
            catatan,
            created_at,
            warga (
              nik,
              nama_warga,
              email
            )
          `)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Gagal mengambil data admin:", error.message);
        } else if (data) {
          setDataMedis(data as any);
          setFilteredData(data as any);

          // === 📊 1. PROSES DATA UNTUK GRAFIK TREN BULANAN ===
          const namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
          const bulananGroup: { [key: string]: { totalSistolik: number; totalGula: number; count: number } } = {};

          data.forEach((item: any) => {
            const date = new Date(item.created_at);
            const bulanKey = `${namaBulan[date.getMonth()]} ${date.getFullYear()}`;
            
            // Ambil angka sistolik dari tensi (misal "210/100" diambil 210-nya)
            const sistolik = parseInt(item.tensi.split("/")[0]) || 120;
            const gula = parseInt(item.gula_darah) || 100;

            if (!bulananGroup[bulanKey]) {
              bulananGroup[bulanKey] = { totalSistolik: 0, totalGula: 0, count: 0 };
            }
            bulananGroup[bulanKey].totalSistolik += sistolik;
            bulananGroup[bulanKey].totalGula += gula;
            bulananGroup[bulanKey].count += 1;
          });

          const trenFormat = Object.keys(bulananGroup).map((key) => ({
            bulan: key,
            "Rata Tensi (Sistolik)": Math.round(bulananGroup[key].totalSistolik / bulananGroup[key].count),
            "Rata Gula Darah": Math.round(bulananGroup[key].totalGula / bulananGroup[key].count),
          }));
          setDataTrenBulanan(trenFormat.reverse()); // Urutkan kronologis

          // === 📊 2. PROSES DATA UNTUK GRAFIK BATANG KATEGORI ===
          let normalCount = 0;
          let hipertensiCount = 0;
          let gulaTinggiCount = 0;

          data.forEach((item: any) => {
            const catatan = item.catatan?.toLowerCase() || "";
            if (catatan.includes("hipertensi")) hipertensiCount++;
            else if (catatan.includes("gula (tinggi)")) gulaTinggiCount++;
            else normalCount++;
          });

          setDataStatusKategori([
            { name: "Normal", Warga: normalCount },
            { name: "Hipertensi", Warga: hipertensiCount },
            { name: "Gula Tinggi", Warga: gulaTinggiCount },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDataKesehatan();
  }, [supabase]);

  // Fungsi Filter/Pencarian Real-time
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query === "") {
      setFilteredData(dataMedis);
    } else {
      const filtered = dataMedis.filter((item) => {
        const nama = item.warga?.nama_warga?.toLowerCase() || "";
        const nik = item.warga?.nik?.toLowerCase() || "";
        const email = item.warga?.email?.toLowerCase() || "";
        return nama.includes(query) || nik.includes(query) || email.includes(query);
      });
      setFilteredData(filtered);
    }
  }, [searchQuery, dataMedis]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <Loader2 className="animate-spin text-[#0a1680] mx-auto" size={40} />
          <p className="text-gray-500 text-sm font-medium">Sinkronisasi dashboard klinis warga...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-8 font-sans">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <FiActivity className="text-[#0a1680]" /> Pusat Data & Grafik Kesehatan
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Analisis data statistik dan rekam medis riwayat pemeriksaan berkala warga.
          </p>
        </div>
        
        <div className="bg-[#0a1680]/5 px-4 py-2 rounded-2xl border border-[#0a1680]/10 text-right self-start sm:self-center">
          <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Total Riwayat</span>
          <span className="text-xl font-black text-[#0a1680]">{dataMedis.length} Pemeriksaan</span>
        </div>
      </div>

      {/* 📊 SEKSI GRAFIK UTAMA (DI ATAS TABEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Tren Garis */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <FiTrendingUp className="text-red-500" /> Rata-Rata Tren Klinis Bulanan
            </h4>
            <p className="text-xs text-gray-400">Fluktuasi rata-rata nilai tensi dan gula darah keseluruhan warga.</p>
          </div>
          <div className="h-64 w-full text-[11px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataTrenBulanan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fcfdff" />
                <XAxis dataKey="bulan" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Rata Tensi (Sistolik)" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Rata Gula Darah" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Batang Kategori */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
              <FiUser className="text-blue-500" /> Distribusi Kondisi Kesehatan Warga
            </h4>
            <p className="text-xs text-gray-400">Pengelompokan jumlah warga berdasarkan kesimpulan rekam medis.</p>
          </div>
          <div className="h-64 w-full text-[11px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataStatusKategori}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fcfdff" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Warga" fill="#0a1680" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 🔍 SEKSI TABEL DATA & PENCARIAN (DI BAWAH GRAFIK) */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-3">
          <FiSearch className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari data warga di bawah berdasarkan Nama, NIK, atau Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {filteredData.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm font-medium flex flex-col items-center justify-center gap-2">
                <FiInfo size={36} className="text-gray-300" />
                <span>Tidak ditemukan data pemeriksaan yang cocok.</span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><FiCalendar size={13} /> Tanggal Periksa</span>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><FiUser size={13} /> Identitas Warga</span>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><FiHeart size={13} /> Tensi Darah</span>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><FiDroplet size={13} /> Gula Darah</span>
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sistem / Catatan Diagnosis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="text-sm font-extrabold text-gray-900">{item.warga?.nama_warga || "Anonim"}</p>
                          <p className="text-xs font-mono font-bold text-gray-400">NIK: {item.warga?.nik || "-"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-bold border border-red-100">
                          {item.tensi}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
                          {item.gula_darah}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium max-w-xs md:max-w-md break-words">
                        {item.catatan || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}