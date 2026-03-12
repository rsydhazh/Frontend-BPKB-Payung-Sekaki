"use client";

import { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle, FiImage } from "react-icons/fi";

// Mock Interface
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
  
  // State untuk File Fisik & Pratinjau
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const loadData = useCallback(async () => {
    try {
      // Fetch dari API Ndoro di sini
    } catch (error) {
      console.error("Gagal memuat galeri", error);
    }
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
    setPreviewUrl(item.image_url); // Tampilkan gambar lama
    setErrorMsg("");
    setIsModalOpen(true);
  };

  // Handler saat Admin memilih file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Foto & Judul
    if (!title.trim() || (!selectedFile && !previewUrl)) {
      setErrorMsg("File foto dan Judul wajib diisi");
      return;
    }

    try {
      showToast(isEditMode ? "Data galeri berhasil diperbarui" : "Foto berhasil diunggah");
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      setErrorMsg("Gagal menyimpan data.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus foto ini?");
    if (confirmDelete) {
      showToast("Foto berhasil dihapus");
      loadData();
    }
  };

  const showToast = (message: string) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {toastMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-xl shadow-lg border border-green-200 flex items-center gap-3 z-50 animate-fade-in-down">
          <FiCheckCircle size={20} />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Kelola Galeri</h1>
          <p className="text-gray-500 text-sm">Dokumentasi visual kegiatan Balai.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#f1b94c] transition-colors shadow-md font-bold text-sm">
          <FiPlus size={18} /> Tambah Foto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryList.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48 bg-gray-200">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenEdit(item)} className="p-2 bg-white/90 text-yellow-600 rounded-lg hover:bg-yellow-50 backdrop-blur-sm shadow-sm" title="Edit">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/90 text-red-600 rounded-lg hover:bg-red-50 backdrop-blur-sm shadow-sm" title="Hapus">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                {item.category}
              </span>
              <h3 className="font-bold text-[#1a1a1a] text-sm line-clamp-2">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a]">{isEditMode ? "Edit Poto" : "Unggah Foto Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><FiX size={24} /></button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-5">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                  <FiAlertCircle /> {errorMsg}
                </div>
              )}

              {/* ZONA UNGGAH FOTO GALERI */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Unggah Foto <span className="text-red-500">*</span>
                </label>
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#0a1680] transition-colors relative bg-gray-50/50">
                  <div className="space-y-2 text-center">
                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img src={previewUrl} alt="Preview" className="mx-auto h-40 object-cover rounded-lg shadow-sm" />
                        <button 
                          type="button" 
                          onClick={() => { setSelectedFile(null); setPreviewUrl(""); }} 
                          className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors"
                          title="Hapus Gambar"
                        >
                          <FiX size={16}/>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-[#0a1680]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiImage className="h-6 w-6 text-[#0a1680]" />
                        </div>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label htmlFor="gallery-upload" className="relative cursor-pointer bg-white rounded-md font-bold text-[#0a1680] hover:text-[#f1b94c] transition-colors focus-within:outline-none">
                            <span>Pilih file gambar</span>
                            <input 
                              id="gallery-upload" 
                              name="gallery-upload" 
                              type="file" 
                              className="sr-only" 
                              accept="image/png, image/jpeg, image/jpg" 
                              onChange={handleFileChange} 
                            />
                          </label>
                          <p className="pl-1 font-medium">dari perangkat Anda</p>
                        </div>
                        <p className="text-xs text-gray-400 font-medium">PNG, JPG, atau JPEG maksimal 2MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul / Caption Foto <span className="text-red-500">*</span></label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680]" placeholder="Misal: Senam Bersama Lansia" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Modul</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680] bg-white">
                  <option value="Umum">Umum</option>
                  <option value="Bina Generasi">Bina Generasi</option>
                  <option value="Keluarga">Keluarga</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#0a1680] hover:bg-[#f1b94c] transition-colors shadow-md">
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