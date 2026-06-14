"use client";
import { useState, useEffect, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle, FiImage, FiUploadCloud } from "react-icons/fi";
import { getDocumentation, createDocumentation, updateDocumentation, deleteDocumentation } from "@/services/documentationService";

interface GalleryData {
  id: string; // ID berupa string UUID murni dari Supabase
  title: string;
  image_url: string;
  modul: string;
}

export default function DokumentasiAdminPage() {
  const [galleryList, setGalleryList] = useState<GalleryData[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  // State konfirmasi hapus kustom
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("umum");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. MEMUAT DATA DARI BACKEND
  const refreshData = useCallback(() => {
    setIsLoading(true);
    getDocumentation()
      .then((data) => {
        setGalleryList(data as unknown as GalleryData[]);
      })
      .catch((error) => {
        console.error("Gagal memuat galeri:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditId(null);
    setTitle("");
    setCategory("umum");
    setSelectedFile(null);
    setPreviewUrl("");
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryData) => {
    setIsEditMode(true);
    setEditId(item.id); // Simpan UUID string murni
    setTitle(item.title);
    setCategory(item.modul || "umum");
    setSelectedFile(null);
    setPreviewUrl(item.image_url || "");
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

  // 2. PROSES SAVE (PUT / POST) - FIXED PARSING & SYNTAX ERROR
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || (!selectedFile && !previewUrl)) {
      setErrorMsg("Judul dan Foto wajib diisi.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("modul", category.toLowerCase());

      if (selectedFile) {
        formData.append("gambar", selectedFile); 
      } else if (isEditMode && previewUrl) {
        formData.append("previewUrl", previewUrl);
      }

      if (isEditMode && editId) {
        await updateDocumentation(editId, formData);
        showToast("Data galeri berhasil diperbarui");
      } else {
        await createDocumentation(formData);
        showToast("Foto berhasil diunggah!");
      }

      setIsModalOpen(false);
      refreshData();
    } catch (error: any) {
      console.error("Gagal save galeri:", error);
      setErrorMsg(error.message || "Gagal menyimpan ke server (404 / Network Error).");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. HANDLER MODAL HAPUS
  const handleOpenDeleteConfirm = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleExecuteDelete = async () => {
    if (!deleteTargetId) return;
    
    setIsLoading(true);
    try {
      await deleteDocumentation(deleteTargetId); 
      showToast("Foto berhasil dihapus");
      refreshData();
    } catch (error: any) {
      console.error("Gagal menghapus galeri:", error);
      alert(error.message || "Gagal menghapus foto dari server.");
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    }
  };

  const showToast = (message: string) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-6 relative pb-10">
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
          <p className="text-gray-500 text-sm mt-1">Manajemen publikasi dokumentasi visual kegiatan Balai.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#0a1680]/90 transition-all duration-300 shadow-lg font-bold text-sm transform active:scale-95">
          <FiPlus size={18} /> Tambah Foto
        </button>
      </div>

      {/* TAMPILAN TABEL LAYOUT */}
      {galleryList.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-20 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
            <FiImage size={40} className="text-gray-300" />
          </div>
          <h3 className="text-gray-800 font-bold text-xl mb-2">Belum ada foto galeri</h3>
          <p className="text-gray-400 text-sm">Silakan klik tombol &quot;Tambah Foto&quot; di atas untuk mulai mengunggah dokumentasi.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6 w-32">Foto</th>
                  <th className="py-4 px-6">Judul Dokumentasi</th>
                  <th className="py-4 px-6 w-48">Kategori</th>
                  <th className="py-4 px-6 w-32 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {galleryList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 shadow-sm shrink-0">
                        <img src={item.image_url || "https://via.placeholder.com/80"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#1a1a1a] text-sm line-clamp-2 leading-relaxed">{item.title}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold capitalize">
                        {item.modul || "umum"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleOpenEdit(item)} className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors" title="Edit">
                          <FiEdit2 size={16} />
                        </button>
                        <button onClick={() => handleOpenDeleteConfirm(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL FORM (INPUT / EDIT) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a]">{isEditMode ? "Edit Foto" : "Unggah Foto Baru"}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"><FiX size={20} /></button>
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
                      <option value="umum">Umum</option>
                      <option value="kependudukan">Kependudukan</option>
                      <option value="keluarga">Keluarga</option>
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
                <button type="submit" disabled={isLoading} className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md transform active:scale-95 flex items-center gap-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a1680] hover:bg-[#0a1680]/90 shadow-md'}`}>
                  {isEditMode ? "Simpan Perubahan" : "Unggah Foto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS CUSTOM */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 p-6 text-center border border-gray-100">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4 text-red-600">
              <FiAlertCircle size={32} />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Hapus Foto Galeri?</h3>
            <p className="text-sm text-gray-400 font-medium px-4 mb-6 leading-relaxed">
              Apakah Anda benar-benar yakin ingin menghapus foto dokumentasi ini secara permanen dari basis data Balai?
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => { setIsDeleteModalOpen(false); setDeleteTargetId(null); }}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-sm transition-colors cursor-pointer min-w-[5rem]"
                disabled={isLoading}
              >
                Tidak
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className={`px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer min-w-[5rem] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Yakin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}