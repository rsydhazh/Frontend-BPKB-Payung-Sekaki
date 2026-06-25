"use client";

import { getNews } from "@/services/newsService";
import { getDocumentation } from "@/services/documentationService";
import { getPrograms } from "@/services/programService";
import { getRegistrations } from "@/services/registrationService"; 
import { useEffect, useState } from "react";
import { FiFileText, FiImage, FiBox, FiActivity, FiUsers, FiRefreshCw } from "react-icons/fi";

// Interface disesuaikan dengan properti yang lu panggil di dalam tabel (JSX)
interface ActivityItem {
  id: number;
  action: string;
  details: string;
  created_at: string;
  status: string;
}

export default function DashboardAdmin() {
  // 1. MENGUBAH STATS MENJADI STATE AGAR BISA DI-UPDATE NILAINYA
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalPendaftar: 0,
    totalBerita: 0,
    programAktif: 0,
    totalGaleri: 0,
  });

  // Fungsi untuk mengambil data dari semua service API
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // 1. Ambil data dari masing-masing service yang udah aman
      const dataPendaftar = await getRegistrations();
      const dataBerita = await getNews();
      const dataProgram = await getPrograms();
      const dataGaleri = await getDocumentation();

      setStats({
        totalPendaftar: Array.isArray(dataPendaftar) ? dataPendaftar.length : 0,
        totalBerita: Array.isArray(dataBerita) ? dataBerita.length : 0,
        programAktif: Array.isArray(dataProgram) ? dataProgram.length : 0,
        totalGaleri: Array.isArray(dataGaleri) ? dataGaleri.length : 0,
      });

      // 2. AMBIL LOG AKTIVITAS LANGSUNG VIA FETCH SUPABASE URL (ANTI GARIS MERAH)
      // Kita langsung tembak REST API Supabase bawaan project lu
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const logRes = await fetch(`${supabaseUrl}/rest/v1/activity_logs?select=*&order=created_at.desc&limit=50`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseAnonKey,
            "Authorization": `Bearer ${supabaseAnonKey}`
          }
        });

        if (logRes && logRes.ok) {
          const logData = await logRes.json();
          setActivities(Array.isArray(logData) ? logData : []);
        }
      }

    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // Jalankan fungsi fetch saat komponen pertama kali dirender
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Dashboard */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Ikhtisar Sistem</h1>
          <p className="text-gray-500 font-medium">Pantau ringkasan data dan aktivitas portal Payung Sekaki.</p>
        </div>
        {/* Tombol Refresh tambahan biar fungsional */}
        <button 
          onClick={fetchDashboardData}
          className="p-2 bg-gray-50 hover:bg-gray-100 border rounded-xl transition-colors"
          title="Refresh Data"
        >
          <FiRefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card Pendaftar */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-yellow-50 text-[#f1b94c] rounded-2xl flex items-center justify-center group-hover:bg-[#f1b94c] group-hover:text-white transition-colors">
            <FiUsers size={24} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pendaftar</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">
              {isLoading ? "..." : stats.totalPendaftar}
            </h3>
          </div>
        </div>

        {/* Card Berita */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="w-14 h-14 bg-blue-50 text-[#0a1680] rounded-2xl flex items-center justify-center group-hover:bg-[#0a1680] group-hover:text-white transition-colors relative z-10">
            <FiFileText size={24} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Berita</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">
              {isLoading ? "..." : stats.totalBerita}
            </h3>
          </div>
        </div>

        {/* Card Program */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors relative z-10">
            <FiBox size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Program Hack</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">
              {isLoading ? "..." : stats.programAktif}
            </h3>
          </div>
        </div>

        {/* Card Galeri */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors relative z-10">
            <FiImage size={24} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Galeri</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">
              {isLoading ? "..." : stats.totalGaleri}
            </h3>
          </div>
        </div>

      </div>

      {/* === BAGIAN AKTIVITAS TERBARU === */}
      <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#0a1680] font-bold text-lg">⚡ Aktivitas Terbaru</span>
        </div>

        {activities.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            Belum ada aktivitas yang tercatat di sistem.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Aksi</th>
                  <th className="py-3 px-4">Detail / Objek</th>
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {activities.map((act) => {
                  let badgeColor = "bg-gray-50 text-gray-600 border-gray-200";
                  if (act.action?.includes("LOGIN")) badgeColor = "bg-green-50 text-green-700 border-green-200";
                  if (act.action?.includes("BERITA")) badgeColor = "bg-blue-50 text-blue-700 border-blue-200";
                  if (act.action?.includes("PENDAFTARAN")) badgeColor = "bg-purple-50 text-purple-700 border-purple-200";

                  return (
                    <tr key={act.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Kolom Aksi */}
                      <td className="py-3 px-4 font-bold">
                        <span className={`px-2.5 py-1 rounded-lg text-xs border uppercase tracking-wide ${badgeColor}`}>
                          {act.action?.replace("_", " ")}
                        </span>
                      </td>
                      
                      {/* Kolom Detail */}
                      <td className="py-3 px-4 font-medium text-gray-700 max-w-xs truncate">
                        {act.details}
                      </td>
                      
                      {/* Kolom Waktu */}
                      <td className="py-3 px-4 text-gray-400 text-xs">
                        {act.created_at ? new Date(act.created_at).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        }) : "-"}
                      </td>
                      
                      {/* Kolom Status */}
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Selesai
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}