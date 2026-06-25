"use client";
import { getNews } from "@/services/newsService";
import { getDocumentation } from "@/services/documentationService";
import { getPrograms } from "@/services/programService";
import { useEffect, useState } from "react";
import { FiFileText, FiImage, FiBox, FiActivity, FiUsers } from "react-icons/fi";

interface ActivityItem {
  id: number;
  aksi: string;
  judul: string;
  waktu: string;
  status: string;
}

export default function DashboardAdmin() {
  // 1. MENGUBAH STATS MENJADI STATE AGAR BISA DI-UPDATE NILAINYA
  const [stats, setStats] = useState({
    totalBerita: 0,
    totalGaleri: 0,
    programAktif: 0,
    totalPendaftar: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
  const fetchDashboardStats = async () => {
    // === BLOK 1: AMBIL BERITA & GALERI (YANG UDAH PASTI JALAN) ===
    try {
      const [beritaData, galeriData] = await Promise.all([
        getNews().catch(() => []),
        getDocumentation().catch(() => [])
      ]);

      const finalBerita = Array.isArray(beritaData) ? beritaData : [];
      const finalGaleri = Array.isArray(galeriData) ? galeriData : [];

      // Set angka box statistik dulu biar aman gak 0 lagi
      setStats({
        totalBerita: finalBerita.length,
        totalGaleri: finalGaleri.length,
        programAktif: 0, 
        totalPendaftar: 0, 
      });
    } catch (error) {
      console.error("Gagal memuat statistik utama:", error);
    }


    // === BLOK 2: AMBIL LOGS DARI BACKEND PORT 3001 
    // === BLOK 2: AMBIL LOGS DARI BACKEND ===
    try {
      setIsLoading(true); // Pastikan loading nyala pas mulai ambil data
      const apiUrl = "http://127.0.0.1:3001"; 
      
      console.log("🔴 URL YANG DITEMBAK:", `${apiUrl}/aktivitas`); 

      const token = localStorage.getItem("token") || localStorage.getItem("admin_token");

      const logRes = await fetch(`${apiUrl}/aktivitas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (logRes && logRes.ok) {
        const logData = await logRes.json();
        const rawLogs = Array.isArray(logData) ? logData : [];
        
        console.log("🟢 DATA LOG YANG DITERIMA FRONTEND:", rawLogs); // <--- JEBAKAN BARU: Cek di inspect element!

        setActivities(rawLogs); 
        setIsLoading(false); // 🔥 LANGSUNG MATIKAN LOADING DI SINI
      } else {
        console.warn("Gagal lolos cekSatpam backend. Status:", logRes?.status);
        setIsLoading(false);
      }
    } catch (logError) {
      console.error("Penyebab Failed to Fetch pada Logs:", logError);
      setIsLoading(false);
    }
  };

    fetchDashboardStats();
    }, []);

  return (
    <div className="space-y-8">
      {/* Header Dashboard */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Ikhtisar Sistem</h1>
        <p className="text-gray-500 font-medium">Pantau ringkasan data dan aktivitas portal Payung Sekaki.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card Pendaftar */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-yellow-50 text-[#f1b94c] rounded-2xl flex items-center justify-center group-hover:bg-[#f1b94c] group-hover:text-white transition-colors">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pendaftar</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">
              {isLoading ? "..." : stats.totalPendaftar}
            </h3>
          </div>
        </div>

        {/* Card Berita */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-blue-50 text-[#0a1680] rounded-2xl flex items-center justify-center group-hover:bg-[#0a1680] group-hover:text-white transition-colors">
            <FiFileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Berita</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">
              {isLoading ? "..." : stats.totalBerita}
            </h3>
          </div>
        </div>

        {/* Card Program */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
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
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <FiImage size={24} />
          </div>
          <div>
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