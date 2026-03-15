"use client";

import { FiFileText, FiImage, FiBox, FiActivity, FiUsers } from "react-icons/fi";

interface ActivityItem {
  id: number;
  aksi: string;
  judul: string;
  waktu: string;
  status: string;
}

export default function DashboardAdmin() {
  const stats = {
    totalBerita: 0,
    totalGaleri: 0,
    programAktif: 0,
    totalPendaftar: 0, // <-- Data baru!
  };

  const recentActivities: ActivityItem[] = [];

  return (
    <div className="space-y-8">
      {/* Header Dashboard */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Ikhtisar Sistem</h1>
        <p className="text-gray-500 font-medium">Pantau ringkasan data dan aktivitas portal Payung Sekaki.</p>
      </div>

      {/* Stats Cards (Sekarang ada 4 kotak) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card Pendaftar (Baru & Prioritas) */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-yellow-50 text-[#f1b94c] rounded-2xl flex items-center justify-center group-hover:bg-[#f1b94c] group-hover:text-white transition-colors">
            <FiUsers size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pendaftar</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">{stats.totalPendaftar}</h3>
          </div>
        </div>

        {/* Card Berita */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-blue-50 text-[#0a1680] rounded-2xl flex items-center justify-center group-hover:bg-[#0a1680] group-hover:text-white transition-colors">
            <FiFileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Berita</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">{stats.totalBerita}</h3>
          </div>
        </div>

        {/* Card Program */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <FiBox size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Program Aktif</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">{stats.programAktif}</h3>
          </div>
        </div>

        {/* Card Galeri */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 group hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <FiImage size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Galeri</p>
            <h3 className="text-3xl font-black text-[#1a1a1a]">{stats.totalGaleri}</h3>
          </div>
        </div>

      </div>

      {/* Tabel Aktivitas Terbaru */}
      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
            <FiActivity className="text-[#0a1680]" /> Aktivitas Terbaru
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-400 border-b border-gray-100">
              <tr>
                <th className="pb-4 font-bold uppercase tracking-wider">Aksi</th>
                <th className="pb-4 font-bold uppercase tracking-wider">Judul / Objek</th>
                <th className="pb-4 font-bold uppercase tracking-wider">Waktu</th>
                <th className="pb-4 font-bold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 animate-pulse">
                      <FiActivity className="text-gray-300" size={32} />
                      <p className="text-gray-400 font-medium italic">Belum ada aktivitas yang tercatat di sistem.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recentActivities.map((activity) => (
                  <tr key={activity.id}>
                    {/* Nanti diisi saat data ditarik dari API */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}