"use client";

import { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle, FiUploadCloud } from "react-icons/fi";
import { getNews, createNews, deleteNews } from "@/services/newsService";
import { News } from "@/types/news"; 

export default function BeritaAdminPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Umum");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = useCallback(() => {
    getNews()
      .then((data) => {
        setNewsList(data);
      })
      .catch((error) => {
        console.error("Gagal memuat data", error);
      });
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditId(null);
    setTitle("");
    setCategory("Umum");
    setContent("");
    setCoverImage("");
    setSelectedFile(null);
    setPreviewUrl("");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: News) => {
    setIsEditMode(true);
    setEditId(item.id);
    setTitle(item.title);
    setCategory(item.category || "Umum");
    setContent(item.content);
    setCoverImage(item.cover_image);
    setSelectedFile(null);
    setPreviewUrl(item.cover_image || "");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || (!selectedFile && !previewUrl)) {
      setErrorMsg("Semua kolom wajib diisi, termasuk foto berita.");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditMode && editId !== null) {
        // Nanti diganti fungsi updateNews jika API Mba Rani sudah siap
        console.log("Mengupdate data dengan ID:", editId);
        showToast("Berita berhasil diperbarui");
      } else {
        await createNews({ title, content, cover_image: previewUrl || coverImage, category });
        showToast("Berita berhasil ditambahkan");
      }
      setIsModalOpen(false);
      refreshData();
    } catch {
      setErrorMsg("Gagal menyimpan data ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus berita ini?");
    if (confirmDelete) {
      try {
        await deleteNews(id); // <-- Ini fungsi sakti yang tadi kita tambahkan di newsService
        showToast("Berita berhasil dihapus");
        refreshData();
      } catch {
        alert("Gagal menghapus berita");
      }
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
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-green-200 flex items-center gap-3 z-50 animate-in slide-in-from-top-4 duration-300">
          <FiCheckCircle size={20} />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Kelola Berita</h1>
          <p className="text-gray-500 text-sm mt-1">Manajemen publikasi berita portal Balai.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#f1b94c] transition-all duration-300 shadow-lg hover:shadow-[#f1b94c]/30 font-bold text-sm transform active:scale-95">
          <FiPlus size={18} /> Tambah Berita
        </button>
      </div>

      {/* Tabel Berita */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Foto</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Judul Berita</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {newsList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <img src={item.cover_image || "https://via.placeholder.com/80"} alt="Cover" className="w-16 h-12 object-cover rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow" />
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#0a1680]/10 text-[#0a1680] rounded-full text-xs font-bold border border-[#0a1680]/20">
                      {item.category || "Umum"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button onClick={() => handleOpenEdit(item)} className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all" title="Edit">
                      <FiEdit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM MEWAH */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a]">{isEditMode ? "Edit Berita" : "Tambah Berita Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all">
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="p-8 space-y-6">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 border border-red-100">
                  <FiAlertCircle size={18} className="shrink-0" /> {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Kolom Judul & Kategori */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita *</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all" placeholder="Masukkan judul..." />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Modul</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all appearance-none cursor-pointer">
                      <option value="Umum">Umum</option>
                      <option value="Kependudukan">Kependudukan</option>
                      <option value="Keluarga">Keluarga</option>
                    </select>
                  </div>
                </div>

                {/* Zona Unggah Foto (Diperkecil dan Dirapikan) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Foto Berita *
                  </label>
                  <div className={`mt-1 flex justify-center items-center p-4 border-2 border-dashed rounded-2xl transition-all relative group cursor-pointer ${previewUrl ? 'border-gray-200 bg-white' : 'border-gray-300 bg-gray-50 hover:bg-[#0a1680]/5 hover:border-[#0a1680]/30'}`}>
                    
                    {previewUrl ? (
                      <div className="relative w-full h-36">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-sm" />
                        <button 
                          type="button" 
                          onClick={(e) => { e.preventDefault(); setSelectedFile(null); setPreviewUrl(""); }} 
                          className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-transform transform hover:scale-110"
                          title="Hapus Gambar"
                        >
                          <FiX size={16}/>
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="file-upload" className="w-full h-36 flex flex-col items-center justify-center cursor-pointer">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                          <FiUploadCloud className="h-6 w-6 text-[#0a1680]" />
                        </div>
                        <span className="text-sm font-bold text-[#0a1680]">Klik untuk unggah</span>
                        <span className="text-xs text-gray-400 mt-1 font-medium">Maks. 2MB (JPG/PNG)</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only" 
                          accept="image/png, image/jpeg, image/jpg" 
                          onChange={handleFileChange} 
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Kolom Deskripsi */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Isi Berita *</label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all resize-none" placeholder="Tulis rincian berita di sini..."></textarea>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md transform active:scale-95 flex items-center gap-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30'}`}>
                  {isEditMode ? "Simpan Perubahan" : "Simpan Berita"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}