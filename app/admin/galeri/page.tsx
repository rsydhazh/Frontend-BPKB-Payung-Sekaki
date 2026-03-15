"use client";

import { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle, FiImage, FiUploadCloud } from "react-icons/fi";

interface GalleryData {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

export default function DokumentasiAdminPage() {
  const [galleryList, setGalleryList] = useState<GalleryData[]>([
    { id: 1, title: "Kegiatan Posyandu RW 05", category: "Umum", image_url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800" },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Umum");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    // Fetch API Ndoro di sini nantinya
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditId(null);
    setTitle("");
    setCategory("Umum");
    setSelectedFile(null);
    setPreviewUrl("");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryData) => {
    setIsEditMode(true);
    setEditId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setSelectedFile(null);
    setPreviewUrl(item.image_url);
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
    if (!title.trim() || (!selectedFile && !previewUrl)) {
      setErrorMsg("File foto dan Judul wajib diisi");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      // 1. Logika untuk merender perubahan di layar (Simulasi sebelum ada API)
      if (isEditMode && editId !== null) {
        setGalleryList(prev => prev.map(item => 
          item.id === editId 
            ? { ...item, title, category, image_url: previewUrl || item.image_url } 
            : item
        ));
        showToast("Data galeri berhasil diperbarui");
      } else {
        const newGallery = {
          id: Date.now(),
          title,
          category,
          // Jika tidak ada gambar, pakai placeholder. Jika ada, pakai preview-nya.
          image_url: previewUrl || "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800" 
        };
        setGalleryList(prev => [...prev, newGallery]);
        showToast("Foto berhasil diunggah");
      }
      
      setIsModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus foto ini?");
    if (confirmDelete) {
      // 2. Jurus sakti melenyapkan foto dari layar
      setGalleryList(prev => prev.filter(item => item.id !== id));
      showToast("Foto berhasil dihapus");
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
          <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Kelola Galeri</h1>
          <p className="text-gray-500 text-sm mt-1">Dokumentasi visual kegiatan Balai.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#f1b94c] transition-all duration-300 shadow-lg hover:shadow-[#f1b94c]/30 font-bold text-sm transform active:scale-95">
          <FiPlus size={18} /> Tambah Foto
        </button>
      </div>

      {/* Grid Galeri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryList.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button onClick={() => handleOpenEdit(item)} className="p-3 bg-white text-yellow-600 rounded-xl hover:scale-110 transition-transform shadow-lg" title="Edit">
                  <FiEdit2 size={18} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform shadow-lg" title="Hapus">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <span className="inline-block px-3 py-1 bg-[#0a1680]/10 text-[#0a1680] rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                {item.category}
              </span>
              <h3 className="font-bold text-[#1a1a1a] text-sm line-clamp-2 leading-snug">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM MEWAH */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a]">{isEditMode ? "Edit Foto" : "Unggah Foto Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 border border-red-100">
                  <FiAlertCircle size={18} className="shrink-0" /> {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul / Caption Foto *</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all" placeholder="Misal: Senam Lansia..." />
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

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Unggah Foto *</label>
                  <div className={`mt-1 flex justify-center items-center p-4 border-2 border-dashed rounded-2xl transition-all relative group cursor-pointer ${previewUrl ? 'border-gray-200 bg-white' : 'border-gray-300 bg-gray-50 hover:bg-[#0a1680]/5 hover:border-[#0a1680]/30'}`}>
                    {previewUrl ? (
                      <div className="relative w-full h-36">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-sm" />
                        <button type="button" onClick={(e) => { e.preventDefault(); setSelectedFile(null); setPreviewUrl(""); }} className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md hover:scale-110 transition-transform" title="Hapus Gambar"><FiX size={16}/></button>
                      </div>
                    ) : (
                      <label htmlFor="gallery-upload" className="w-full h-36 flex flex-col items-center justify-center cursor-pointer">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform"><FiUploadCloud className="h-6 w-6 text-[#0a1680]" /></div>
                        <span className="text-sm font-bold text-[#0a1680]">Klik untuk unggah</span>
                        <span className="text-xs text-gray-400 mt-1 font-medium">Maks. 2MB (JPG/PNG)</span>
                        <input id="gallery-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md transform active:scale-95 flex items-center gap-2 ${isLoading ? 'bg-gray-400' : 'bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30'}`}>
                  {isEditMode ? "Simpan Perubahan" : "Unggah Foto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}