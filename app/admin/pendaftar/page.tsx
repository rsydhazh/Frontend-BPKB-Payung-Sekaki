"use client";

import { useState, useEffect } from "react";
import { FiUsers, FiTrash2, FiRefreshCw, FiAlertCircle, FiDownload } from "react-icons/fi";
import { getRegistrations, deleteRegistration } from "@/services/registrationService";
import { Registration } from "@/types/registration";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Inisialisasi Supabase Publik
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PendaftarAdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari API
  const fetchRegistrations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRegistrations();
      setRegistrations(data as Registration[]);
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

  // FUNGSI BARU: Mengubah Data Menjadi Dokumen PDF Resmi Balai
  const exportToPDF = () => {
    if (registrations.length === 0) return;

    // 1. Inisialisasi Kertas PDF posisi Landscape
    const doc = new jsPDF({ orientation: "landscape", format: "a4" });
    
    // 2. Desain Kop/Judul Laporan menggunakan setTextColor standar jsPDF terbaru
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(26, 26, 26);
    doc.text("BALAI PENYULUH KB KECAMATAN PAYUNG SEKAKI", 14, 15);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("Laporan Data Pendaftar Pelayanan Keluarga Berencana (KB) Online", 14, 21);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}`, 14, 26);
    
    // 3. Ekstrak data pendaftar ke baris PDF
    const tableRows = registrations.map((reg, index) => [
      index + 1,
      reg.full_name,
      reg.nik,
      reg.phone_number,
      reg.status_peserta || "-",
      reg.program_id || "-",
      reg.faskes || "-",
      reg.tanggal_pelayanan ? new Date(reg.tanggal_pelayanan).toLocaleDateString('id-ID') : "-",
      reg.status_layanan || "Diproses"
    ]);

    // 4. Cetak Tabel dengan properti 'cellWidth' (Bukan width) agar TypeScript bahagia
    autoTable(doc, {
      head: [["No", "Nama Lengkap", "NIK", "No. HP", "Status KB", "Jenis Layanan", "Faskes Tujuan", "Tanggal Pelayanan", "Status Tracking"]],
      body: tableRows,
      startY: 32,
      theme: "grid",
      styles: { font: "helvetica", fontSize: 9, cellPadding: 3 },
      headStyles: { 
        fillColor: [10, 22, 128], // Warna tema biru gelap #0a1680
        textColor: [255, 255, 255], 
        fontStyle: "bold",
        halign: "center"
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 12 }, // Menggunakan cellWidth sesuai aturan TypeScript
        7: { halign: "center" },
        8: { halign: "center", fontStyle: "bold" }
      }
    });

    // 5. Unduh Dokumen PDF
    const fileDate = new Date().toISOString().slice(0, 10);
    doc.save(`Laporan_Pendaftar_KB_${fileDate}.pdf`);
  };

  // Update Status Layanan Warga
  const handleUpdateStatus = async (id: number | string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("registrations")
        .update({ status_layanan: newStatus })
        .eq("id", id);

      if (error) throw error;

      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === id ? { ...reg, status_layanan: newStatus } : reg
        )
      );
      
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal mengubah status. Pastikan BE sudah menambahkan kolom status_layanan di Supabase!");
    }
  };

  // Fungsi untuk menghapus data pendaftar
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data pendaftar ini?");
    if (!confirmDelete) return;

    try {
      await deleteRegistration(id);
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
        
        {/* BLOK TOMBOL AKSI */}
        <div className="flex items-center gap-3">
          {/* TOMBOL PDF */}
          <button 
            onClick={exportToPDF}
            disabled={isLoading || registrations.length === 0}
            className={`flex items-center gap-2 px-5 py-2.5 font-bold rounded-xl shadow-sm transition-all text-white ${
              isLoading || registrations.length === 0 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-red-600 hover:bg-red-700 transform active:scale-95"
            }`}
          >
            <FiDownload size={16} />
            Download PDF
          </button>

          <button 
            onClick={fetchRegistrations}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#0a1680] font-bold rounded-xl hover:bg-gray-50 hover:border-[#0a1680]/30 transition-all shadow-sm"
          >
            <FiRefreshCw className={isLoading ? "animate-spin" : ""} />
            Update Data
          </button>
        </div>
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
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">NIK & No. HP</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Status KB</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Jenis Program</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider">Faskes & Tgl</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-center">Tracking Warga</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {registrations.map((reg, index) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-[#1a1a1a]">{reg.full_name}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{reg.nik}</div>
                      <div className="text-xs text-gray-500 mt-1">{reg.phone_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-600">
                        {reg.status_peserta || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                        {reg.program_id || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{reg.faskes || "-"}</div>
                      <div className="text-xs text-gray-500 mt-1">{reg.tanggal_pelayanan || "-"}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select
                        value={reg.status_layanan || "Diproses"}
                        onChange={(e) => handleUpdateStatus(reg.id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-4 py-2 border outline-none cursor-pointer transition-all shadow-sm ${
                          reg.status_layanan === "Selesai"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(reg.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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