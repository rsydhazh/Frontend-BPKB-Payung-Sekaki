"use client";

import { useState, useEffect, useCallback } from "react";
// Tambahan FiImage untuk ikon upload
import { FiPlus, FiEdit2, FiTrash2, FiX, FiAlertCircle, FiCheckCircle, FiImage } from "react-icons/fi";
// Sesuaikan impor ini dengan lokasi service Ndoro
import { getNews, createNews } from "@/services/newsService";
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
  
  // State untuk File Fisik
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");

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
    setPreviewUrl(item.cover_image || ""); // Memunculkan foto lama di pratinjau
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
    
    // Validasi: Cek title, content, dan pastikan ada gambar (baik gambar baru atau URL lama)
    if (!title.trim() || !content.trim() || (!selectedFile && !previewUrl)) {
      setErrorMsg("Semua kolom wajib diisi, termasuk foto berita.");
      return;
    }

    try {
      // PERHATIAN: Di sinilah nanti Ndoro perlu mengubah logika API menjadi FormData 
      // jika menggunakan selectedFile. Untuk sementara kita asumsikan menggunakan coverImage teks.
      
      if (isEditMode && editId !== null) {
        console.log("Mengupdate data dengan ID:", editId);
        showToast("Berita berhasil diperbarui");
      } else {
        await createNews({ title, content, cover_image: coverImage, category });
        showToast("Berita berhasil ditambahkan");
      }
      setIsModalOpen(false);
      refreshData();
    } catch (error) {
      setErrorMsg("Gagal menyimpan data ke server.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus berita ini?");
    if (confirmDelete) {
      try {
        console.log("Menghapus data dengan ID:", id);
        showToast("Berita berhasil dihapus");
        refreshData();
      } catch (error) {
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
      {toastMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-xl shadow-lg border border-green-200 flex items-center gap-3 z-50 animate-fade-in-down">
          <FiCheckCircle size={20} />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1a1a]">Kelola Berita</h1>
          <p className="text-gray-500 text-sm">Manajemen publikasi berita portal Balai.</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#0a1680] text-white px-5 py-2.5 rounded-xl hover:bg-[#f1b94c] transition-colors shadow-md font-bold text-sm">
          <FiPlus size={18} /> Tambah Berita
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Foto</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Judul Berita</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Kategori</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {newsList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <img src={item.cover_image || "https://via.placeholder.com/80"} alt="Cover" className="w-16 h-12 object-cover rounded-lg border border-gray-200" />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                    {item.category || "Umum"}
                  </span>
                </td>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-extrabold text-[#1a1a1a]">{isEditMode ? "Edit Berita" : "Tambah Berita Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><FiX size={24} /></button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                  <FiAlertCircle /> {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita <span className="text-red-500">*</span></label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680]" placeholder="Masukkan judul..." />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Modul</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680] bg-white">
                    <option value="Umum">Umum</option>
                    <option value="Bina Generasi">Bina Generasi</option>
                    <option value="Keluarga">Keluarga</option>
                  </select>
                </div>

                {/* ZONA UNGGAH FILE FISIK */}
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Unggah Foto Berita <span className="text-red-500">*</span>
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
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-bold text-[#0a1680] hover:text-[#f1b94c] transition-colors focus-within:outline-none">
                              <span>Pilih file gambar</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
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

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Berita <span className="text-red-500">*</span></label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1680] resize-none" placeholder="Tulis isi berita di sini..."></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#0a1680] hover:bg-[#f1b94c] transition-colors shadow-md">
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