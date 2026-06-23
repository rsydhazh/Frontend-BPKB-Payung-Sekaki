"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiClock, FiCheckCircle, FiActivity, FiCreditCard, FiRefreshCw, FiAlertCircle, FiList, FiMessageCircle } from "react-icons/fi";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Publik (Jurus Ninja bypass Login Admin)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type KBRegistration = {
  id: string;
  full_name: string;
  nik: string;
  jenis_kb?: string;
  status_peserta?: string;
  tanggal_pelayanan?: string;
  created_at?: string;
};

type RiwayatLog = {
  waktu: string;
  aksi: string;
};

export default function CekStatusKBPage() {
  const [searchNik, setSearchNik] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [riwayatData, setRiwayatData] = useState<KBRegistration[]>([]);
  const [aktivitasLokal, setAktivitasLokal] = useState<RiwayatLog[]>([]);

  // Mengambil log aktivitas dari memori HP/Laptop saat halaman dimuat
  useEffect(() => {
    const savedLogs = localStorage.getItem("logAktivitasKB");
    if (savedLogs) {
      setAktivitasLokal(JSON.parse(savedLogs));
    }
  }, []);

  // Fungsi untuk menambah dan menyimpan log aktivitas
  const catatAktivitas = (aksiBaru: string) => {
    const logBaru = {
      waktu: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      aksi: aksiBaru
    };
    const updateLog = [logBaru, ...aktivitasLokal].slice(0, 5); // Simpan maksimal 5 log terbaru
    setAktivitasLokal(updateLog);
    localStorage.setItem("logAktivitasKB", JSON.stringify(updateLog));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNik || searchNik.length < 16) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Menarik data langsung dari Supabase tanpa melewati API Admin
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("nik", searchNik);

      if (error) throw error;

      setRiwayatData(data || []);
      
      // Catat aktivitas ke LocalStorage
      catatAktivitas(`Melakukan pelacakan status untuk NIK: ${searchNik.slice(0, 4)}********${searchNik.slice(-4)}`);
      
    } catch (error) {
      console.error("Gagal menarik data riwayat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logika membandingkan tanggal (Apakah sudah lewat atau belum)
  const getStatusPelayanan = (tanggalPelayanan?: string) => {
    if (!tanggalPelayanan) return { status: "Diproses", warna: "bg-blue-100 text-blue-700", pesan: "Admin Balai akan menghubungi Anda melalui WhatsApp." };
    
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);
    
    const tglLayanan = new Date(tanggalPelayanan);
    tglLayanan.setHours(0, 0, 0, 0);

    if (hariIni > tglLayanan) {
      return { 
        status: "Selesai", 
        warna: "bg-green-100 text-green-700 border-green-200", 
        pesan: "Pelayanan telah selesai dilaksanakan sesuai jadwal." 
      };
    } else {
      return { 
        status: "Diproses", 
        warna: "bg-yellow-100 text-yellow-700 border-yellow-200", 
        pesan: "Admin Balai akan menghubungi Anda melalui WhatsApp untuk konfirmasi." 
      };
    }
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* HEADER BIRU */}
      <section className="bg-[#0a1680] text-white pt-14 pb-32 overflow-hidden rounded-b-[4rem] shadow-lg relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <FiActivity className="text-5xl text-[#f1b94c] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
             Lacak Status <span className="text-[#f1b94c]">Pelayanan KB</span>
          </h1>
          <p className="text-[#93b2f8] text-lg font-medium leading-relaxed">
            Masukkan NIK Anda untuk melihat riwayat dan status pendaftaran Keluarga Berencana yang telah Anda lakukan.
          </p>
        </div>
      </section>

      {/* KOTAK PENCARIAN */}
      <div className="max-w-2xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_15px_50px_rgba(10,22,128,0.1)] border border-gray-100 p-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FiCreditCard size={20} />
              </div>
              <input 
                required 
                type="text" 
                maxLength={16}
                value={searchNik} 
                onChange={(e) => setSearchNik(e.target.value)} 
                placeholder="Masukkan 16 Digit NIK Anda..." 
                className="w-full border-2 border-gray-100 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-[#0a1680]/10 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm font-bold tracking-widest" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || searchNik.length < 16}
              className={`px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${isLoading || searchNik.length < 16 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30 transform active:scale-95'}`}
            >
              {isLoading ? <FiRefreshCw className="animate-spin" size={20} /> : <FiSearch size={20} />}
              Cari Data
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4 text-center">Data pencarian dijamin aman dan hanya menampilkan riwayat NIK yang bersangkutan.</p>
        </div>
      </div>

      {/* HASIL PENCARIAN */}
      {hasSearched && (
        <div className="max-w-4xl mx-auto px-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
          
          {isLoading ? (
            <div className="text-center py-16">
              <FiRefreshCw className="animate-spin text-[#0a1680] mx-auto text-4xl mb-4" />
              <p className="text-gray-500 font-bold mt-2">Mencari riwayat pendaftaran Anda...</p>
            </div>
          ) : riwayatData.length === 0 ? (
            <div className="bg-red-50 rounded-3xl p-12 text-center border border-red-100">
              <FiAlertCircle className="text-red-300 text-6xl mx-auto mb-4" />
              <h3 className="text-2xl font-black text-red-700 mb-2">Data Tidak Ditemukan</h3>
              <p className="text-red-500 font-medium">Kami tidak dapat menemukan pendaftaran KB dengan NIK tersebut. Pastikan NIK yang Anda masukkan sudah benar.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#1a1a1a] mb-6 flex items-center gap-2">
                <FiClock className="text-[#0a1680]" /> Riwayat Pendaftaran ({riwayatData.length})
              </h3>
              
              {riwayatData.map((item, index) => {
                const infoStatus = getStatusPelayanan(item.tanggal_pelayanan);

                return (
                  <div key={index} className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
                    
                    {/* Header Item */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-50">
                      <div>
                        <h4 className="text-2xl font-black text-[#1a1a1a] mb-1">{item.full_name}</h4>
                        <p className="text-gray-500 font-medium flex items-center gap-2">
                           Layanan: <strong className="text-[#0a1680] bg-blue-50 px-3 py-1 rounded-lg">{item.jenis_kb || "Pelayanan KB"}</strong>
                        </p>
                      </div>
                      
                      {/* Badge Status Dinamis */}
                      <div className={`px-4 py-2 rounded-xl border font-bold text-sm flex items-center gap-2 ${infoStatus.warna}`}>
                        {infoStatus.status === "Selesai" ? <FiCheckCircle size={18} /> : <FiRefreshCw className="animate-spin" size={18} />}
                        {infoStatus.status}
                      </div>
                    </div>

                    {/* Detail Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status Peserta</div>
                        <div className="font-black text-gray-800">{item.status_peserta || "-"}</div>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Jadwal Tanggal</div>
                        <div className="font-black text-gray-800">{item.tanggal_pelayanan ? new Date(item.tanggal_pelayanan).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "-"}</div>
                      </div>
                    </div>

                    {/* Kotak Pesan Info Admin */}
                    <div className="bg-[#0a1680]/5 rounded-xl p-4 flex items-start gap-3 border border-[#0a1680]/10">
                      <FiMessageCircle className="text-[#0a1680] shrink-0 mt-0.5" size={20} />
                      <p className="text-sm font-medium text-[#0a1680]/80 leading-relaxed">
                        {infoStatus.pesan}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* LOG AKTIVITAS (LOCAL STORAGE) */}
      {aktivitasLokal.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 mt-16">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-[#1a1a1a] mb-6 flex items-center gap-2">
              <FiList className="text-gray-400" /> Log Aktivitas Perangkat Anda
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {aktivitasLokal.map((log, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-50 text-[#0a1680] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <FiActivity size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <time className="text-xs font-bold text-[#f1b94c]">{log.waktu}</time>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{log.aksi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}