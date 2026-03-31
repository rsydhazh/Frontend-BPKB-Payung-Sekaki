"use client";

import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle, FiLayers, FiInbox } from "react-icons/fi";
import { Program } from "@/types/program";

export default function ProgramAdminPage() {
  // 1. Memulai dengan state kosong sesuai titah Ndoro
  const [programList, setProgramList] = useState<Program[]>([]);
  
  const [activeTab, setActiveTab] = useState<"semua" | "kependudukan" | "keluarga">("semua");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  // State Input Fields (Sudah menggunakan 'name' & 'description' sesuai types)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [modul, setModul] = useState("kependudukan");
  const [kategori, setKategori] = useState("reguler");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Logika Filter Tab
  const filteredPrograms = programList.filter(prog => {
    if (activeTab === "semua") return true;
    return prog.module === activeTab;
  });

  // Logika Dropdown Kategori Otomatis
  const handleModulChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModul = e.target.value;
    setModul(selectedModul);
    if (selectedModul === "kependudukan") setKategori("reguler");
    else if (selectedModul === "keluarga") setKategori("kesejahteraan");
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditId(null);
    setName("");
    setSchedule("");
    setDescription("");
    setModul("kependudukan");
    setKategori("reguler");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Program) => {
    setIsEditMode(true);
    setEditId(item.id);
    setName(item.name);
    setSchedule(item.schedule || "");
    setDescription(item.description);
    setModul(item.module || "kependudukan");
    setKategori(item.category || "reguler");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !schedule.trim()) {
      setErrorMsg("Nama Program dan Jadwal Pelaksanaan wajib diisi");
      return;
    }
    setIsLoading(true);
    
    // Simulasi simpan (nanti Ndoro sambungkan ke programService)
    setTimeout(() => {
      if (isEditMode && editId !== null) {
        setProgramList(prev => prev.map(item => 
          item.id === editId ? { ...item, name, schedule, description, module: modul, category: kategori } : item
        ));
        showToast("Program berhasil diperbarui");
      } else {
        const newProgram: Program = { 
          id: Date.now(), 
          name, 
          schedule, 
          description, 
          cover_image: "", // Placeholder
          module: modul, 
          category: kategori 
        };
        setProgramList(prev => [...prev, newProgram]);
        showToast("Program berhasil ditambahkan");
      }
      setIsModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus program ini?")) {
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
      {/* Toast Notifikasi */}
      {toastMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-2xl shadow-lg border border-green-200 flex items-center gap-3 z-50 animate-in slide-in-from-top-4">
          <FiCheckCircle size={20} />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Kelola Program</h1>
          <p className="text-gray-500 text-sm mt-1">Manajemen distribusi program untuk halaman Publik.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#f1b94c] transition-all shadow-lg hover:shadow-[#f1b94c]/30 font-bold text-sm transform active:scale-95">
          <FiPlus size={18} /> Tambah Program
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-2 w-max">
        <button onClick={() => setActiveTab("semua")} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "semua" ? "bg-[#0a1680] text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
          Semua Program
        </button>
        <button onClick={() => setActiveTab("kependudukan")} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "kependudukan" ? "bg-blue-100 text-[#0a1680] shadow-md border border-blue-200" : "text-gray-500 hover:bg-gray-50"}`}>
          Modul Kependudukan
        </button>
        <button onClick={() => setActiveTab("keluarga")} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "keluarga" ? "bg-yellow-100 text-yellow-700 shadow-md border border-yellow-200" : "text-gray-500 hover:bg-gray-50"}`}>
          Modul Keluarga
        </button>
      </div>

      {/* Tabel Program */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Detail Program</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Penempatan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Jadwal</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                        <FiInbox size={40} className="text-gray-300" />
                      </div>
                      <div className="max-w-xs">
                        <p className="text-gray-800 font-bold">Belum ada data program</p>
                        <p className="text-gray-400 text-sm mt-1">Silakan klik tombol &quot;Tambah Program&quot; untuk mulai mengisi modul ini.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">{item.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          item.module === "kependudukan" 
                            ? "bg-blue-50 text-[#0a1680] border-blue-100" 
                            : "bg-yellow-50 text-yellow-700 border-yellow-100"
                        }`}>
                          {item.module}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 pl-1 uppercase tracking-tighter">
                          Kategori: {item.category?.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-[#0a1680] bg-[#0a1680]/5 px-3 py-1.5 rounded-lg border border-[#0a1680]/10">
                        {item.schedule}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOpenEdit(item)} className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"><FiEdit2 size={18} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><FiTrash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM PROGRAM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-2"><FiLayers className="text-[#0a1680]"/> {isEditMode ? "Edit Program" : "Tambah Program Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 border border-red-100">
                  <FiAlertCircle size={18} /> {errorMsg}
                </div>
              )}

              {/* Selector Modul & Kategori */}
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                <div>
                  <label className="block text-sm font-bold text-[#0a1680] mb-2 uppercase tracking-wide text-[11px]">Penempatan Modul</label>
                  <select value={modul} onChange={handleModulChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 font-bold text-gray-700 cursor-pointer">
                    <option value="kependudukan">Kependudukan</option>
                    <option value="keluarga">Keluarga</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0a1680] mb-2 uppercase tracking-wide text-[11px]">Kategori Tampilan</label>
                  <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 text-gray-700 cursor-pointer">
                    {modul === "kependudukan" ? (
                      <>
                        <option value="reguler">Program Reguler</option>
                        <option value="quick_win">Quick Wins</option>
                      </>
                    ) : (
                      <>
                        <option value="kesejahteraan">Kesejahteraan Keluarga</option>
                        <option value="kb">Keluarga Berencana (KB)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Data Detail */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Program *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 transition-all text-sm" placeholder="Contoh: Posyandu Lansia" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Jadwal Pelaksanaan *</label>
                  <input type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 transition-all text-sm" placeholder="Contoh: Setiap Selasa, 08:00 WIB" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Singkat</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 transition-all resize-none text-sm" placeholder="Jelaskan tujuan singkat program ini..."></textarea>
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