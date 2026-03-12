"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

// Mock Interface untuk Program (Pastikan ini ada di file types Ndoro)
interface ProgramData {
  id: number;
  nama: string;
  jadwal: string;
  deskripsi: string;
}

export default function ProgramAdminPage() {
  // Simulasi data awal
  const [programList, setProgramList] = useState<ProgramData[]>([
    { id: 1, nama: "Bina Keluarga Balita (BKB)", jadwal: "Setiap Kamis, 09:00 WIB", deskripsi: "Pembinaan orang tua dalam pengasuhan balita." }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  // State Input Fields (USpec: Kelola Program)
  const [nama, setNama] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditId(null);
    setNama("");
    setJadwal("");
    setDeskripsi("");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ProgramData) => {
    setIsEditMode(true);
    setEditId(item.id);
    setNama(item.nama);
    setJadwal(item.jadwal);
    setDeskripsi(item.deskripsi);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // USpec: Exception Flow 1 - Validasi Nama & Jadwal
    if (!nama.trim() || !jadwal.trim()) {
      setErrorMsg("Nama Program dan Jadwal Pelaksanaan wajib diisi");
      return;
    }

    // Simulasi simpan ke API
    showToast(isEditMode ? "Program berhasil diperbarui" : "Program berhasil ditambahkan");
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus program ini?");
    if (confirmDelete) {
      showToast("Program berhasil dihapus");
    }
  };

  const showToast = (message: string) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Pop-up Notifikasi Berhasil */}
      {toastMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-xl shadow-lg border border-green-200 flex items-center gap-3 z-50">
          <FiCheckCircle size={20} />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header & Tombol Tambah */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Kelola Program</h1>
          <p className="text-gray-500 text-sm">Manajemen program kegiatan di Balai Payung Sekaki.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#f1b94c] transition-colors shadow-md font-bold text-sm">
          <FiPlus size={18} /> Tambah Program
        </button>
      </div>

      {/* Tabel Program */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Nama Program</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Jadwal Pelaksanaan</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {programList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.nama}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{item.jadwal}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-3">
                  <button onClick={() => handleOpenEdit(item)} className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors" title="Edit">
                    <FiEdit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Hapus">
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM PROGRAM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a]">{isEditMode ? "Edit Program" : "Tambah Program Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><FiX size={24} /></button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-5">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                  <FiAlertCircle /> {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Program <span className="text-red-500">*</span></label>
                <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680]" placeholder="Misal: Posyandu Lansia" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jadwal Pelaksanaan <span className="text-red-500">*</span></label>
                <input type="text" value={jadwal} onChange={(e) => setJadwal(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680]" placeholder="Misal: Setiap Selasa, 08:00 WIB" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Program</label>
                <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680] resize-none" placeholder="Tulis penjelasan singkat program..."></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#0a1680] hover:bg-[#f1b94c] transition-colors shadow-md">
                  {isEditMode ? "Simpan Perubahan" : "Simpan Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}