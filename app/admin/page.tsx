import { FiFileText, FiImage, FiBox, FiTrendingUp } from "react-icons/fi";

// Mock Data untuk tabel aktivitas
const recentActivities = [
  { id: 1, action: "Upload Berita", title: "Kunjungan Bapak Walikota", date: "Hari ini, 10:45 WIB", status: "Berhasil" },
  { id: 2, action: "Update Program", title: "Program Jumat Berkah", date: "Kemarin, 15:30 WIB", status: "Berhasil" },
  { id: 3, action: "Hapus Galeri", title: "Foto Kegiatan Usang", date: "08 Mar 2026, 09:15 WIB", status: "Selesai" },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Ikhtisar Sistem</h1>
        <p className="text-gray-500 font-medium">Pantau ringkasan data dan aktivitas portal Payung Sekaki.</p>
      </div>

      {/* 1. KARTU STATISTIK PREMIUM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kartu Berita */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 transform hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <FiFileText className="text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Berita</p>
            <h3 className="text-4xl font-black text-[#1a1a1a]">12</h3>
          </div>
        </div>

        {/* Kartu Galeri */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 transform hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <FiImage className="text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Dokumentasi</p>
            <h3 className="text-4xl font-black text-[#1a1a1a]">8</h3>
          </div>
        </div>

        {/* Kartu Program */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-6 transform hover:-translate-y-2 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-[#f1b94c]">
            <FiBox className="text-3xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Program Aktif</p>
            <h3 className="text-4xl font-black text-[#1a1a1a]">5</h3>
          </div>
        </div>
      </div>

      {/* 2. TABEL AKTIVITAS TERBARU  */}
      <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-3">
            <FiTrendingUp className="text-[#0a1680]" /> Aktivitas Terbaru
          </h2>
          <button className="text-sm font-bold text-[#0a1680] hover:text-[#f1b94c] transition-colors">Lihat Semua</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Aksi</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Judul / Objek</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Waktu</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivities.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-[#0a1680]">{row.action}</td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-700">{row.title}</td>
                  <td className="px-8 py-5 text-sm text-gray-500">{row.date}</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-200">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}