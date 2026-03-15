"use client";

import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface ProgramData {
  id: number;
  nama: string;
  jadwal: string;
  deskripsi: string;
}

export default function ProgramAdminPage() {
  const [programList, setProgramList] = useState<ProgramData[]>([
    { id: 1, nama: "Bina Keluarga Balita (BKB)", jadwal: "Setiap Kamis, 09:00 WIB", deskripsi: "Pembinaan orang tua dalam pengasuhan balita." }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [nama, setNama] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (!nama.trim() || !jadwal.trim()) {
      setErrorMsg("Nama Program dan Jadwal Pelaksanaan wajib diisi");
      return;
    }
    setIsLoading(true);
    
    setTimeout(() => {
      // 1. Logika untuk menyimpan atau mengedit data di layar
      if (isEditMode && editId !== null) {
        setProgramList(prev => prev.map(item => 
          item.id === editId ? { ...item, nama, jadwal, deskripsi } : item
        ));
        showToast("Program berhasil diperbarui");
      } else {
        const newProgram = { id: Date.now(), nama, jadwal, deskripsi };
        setProgramList(prev => [...prev, newProgram]);
        showToast("Program berhasil ditambahkan");
      }
      
      setIsModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus program ini?");
    if (confirmDelete) {
      // 2. Logika sakti untuk menghilangkan data dari tabel
      setProgramList(prev => prev.filter(item => item.id !== id));
      showToast("Program berhasil dihapus");
    }
  };

  const showToast = (message: string) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {toastMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-green-200 flex items-center gap-3 z-50 animate-in slide-in-from-top-4 duration-300">
          <FiCheckCircle size={20} />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Kelola Program</h1>
          <p className="text-gray-500 text-sm mt-1">Manajemen program kegiatan di Balai Payung Sekaki.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#f1b94c] transition-all duration-300 shadow-lg hover:shadow-[#f1b94c]/30 font-bold text-sm transform active:scale-95">
          <FiPlus size={18} /> Tambah Program
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Program</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Jadwal Pelaksanaan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {programList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.nama}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#0a1680] bg-[#0a1680]/5 rounded-xl inline-block mt-3 mb-3 ml-6">{item.jadwal}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleOpenEdit(item)} className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all" title="Edit"><FiEdit2 size={18} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Hapus"><FiTrash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a]">{isEditMode ? "Edit Program" : "Tambah Program Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 border border-red-100">
                  <FiAlertCircle size={18} className="shrink-0" /> {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Program *</label>
                  <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all" placeholder="Misal: Posyandu Lansia" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jadwal Pelaksanaan *</label>
                  <input type="text" value={jadwal} onChange={(e) => setJadwal(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all" placeholder="Misal: Setiap Selasa..." />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Program</label>
                  <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all resize-none" placeholder="Tulis penjelasan singkat program..."></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md transform active:scale-95 flex items-center gap-2 ${isLoading ? 'bg-gray-400' : 'bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30'}`}>
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