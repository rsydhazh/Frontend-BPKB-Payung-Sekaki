"use client";

import { useState, useEffect } from "react";
import { FiUsers, FiTrash2, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { getRegistrations, deleteRegistration } from "@/services/registrationService";
import { Registration } from "@/types/registration";

export default function PendaftarAdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari API Mba Rani
  const fetchRegistrations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRegistrations();
      // Mengurutkan data dari yang paling baru jika ada created_at (opsional)
      setRegistrations(data);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data pendaftar. Pastikan koneksi server backend berjalan baik.");
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fetch saat halaman pertama kali dibuka
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Fungsi untuk menghapus data pendaftar
  const handleDelete = async (id: number) => {
    // Konfirmasi sebelum menghapus agar tidak salah pencet
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?");
    if (!confirmDelete) return;

    try {
      await deleteRegistration(id);
      // Jika berhasil di backend, kita hapus juga dari tampilan layar (tanpa harus refresh)
      setRegistrations(registrations.filter((reg) => reg.id !== id));
      alert("Data berhasil dihapus!");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data. Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Data Pendaftar</h1>
          <p className="text-gray-500 font-medium">
            Kelola data masyarakat yang mendaftar pada layanan Kependudukan dan Keluarga Berencana.
          </p>
        </div>
        
        <button 
          onClick={fetchRegistrations}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#0a1680] font-bold rounded-xl hover:bg-gray-50 hover:border-[#0a1680]/30 transition-all shadow-sm"
        >
          <FiRefreshCw className={isLoading ? "animate-spin" : ""} />
          Update Data
        </button>
      </div>

      {/* Area Tabel */}
      <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* State Loading */}
        {isLoading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <FiRefreshCw className="text-[#0a1680] text-4xl animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Sedang menarik data dari server...</p>
          </div>
        ) : error ? (
          /* State Error */
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <FiAlertCircle className="text-red-500 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button onClick={fetchRegistrations} className="px-6 py-2 bg-[#0a1680] text-white font-bold rounded-lg hover:bg-[#f1b94c] transition-colors">Coba Lagi</button>
          </div>
        ) : registrations.length === 0 ? (
          /* State Kosong */
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiUsers className="text-gray-300" size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Pendaftar</h3>
            <p className="text-gray-400 font-medium">Data warga yang mendaftar melalui portal akan muncul di sini.</p>
          </div>
        ) : (
          /* Tabel Data Tersedia */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Nama Lengkap</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">NIK</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Program / Layanan</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">No. HP</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {registrations.map((reg, index) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-[#1a1a1a]">{reg.full_name}</td>
                    <td className="px-6 py-4">{reg.nik}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        reg.program_id.includes('KB') 
                        ? 'bg-[#f1b94c]/20 text-[#d99c2b]' 
                        : 'bg-[#0a1680]/10 text-[#0a1680]'
                      }`}>
                        {reg.program_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">{reg.phone_number}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(reg.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus Data"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}