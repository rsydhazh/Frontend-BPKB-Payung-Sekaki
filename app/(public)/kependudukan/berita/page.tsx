"use client";

import { useEffect, useState } from "react";
import { FiCalendar, FiArrowRight, FiFileText, FiClock, FiX, FiImage } from "react-icons/fi"; 
import { News } from "@/types/news";
import { getNews } from "@/services/newsService";

export default function BeritaBinaGenerasiPage() {
  const [beritaData, setBeritaData] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk mengontrol berita yang aktif di popup modal
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    async function fetchBerita() {
      try {
        const data = await getNews();
        const beritaKependudukan = data.filter(
          (item) => item.modul === "kependudukan"
        );
        setBeritaData(beritaKependudukan);
      } catch (error) {
        console.error("Gagal ambil berita:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBerita();
  }, []);

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans pt-14 relative">
      {/* 1. HEADER */}
      <section className="pt-2 pb-20 px-6 text-center max-w-3xl mx-auto relative">
        <div className="w-16 h-16 bg-[#0a1680]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FiFileText className="text-3xl text-[#0a1680]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">
          Berita & <span className="text-[#0a1680]">Informasi</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Kumpulan artikel, pengumuman, dan berita terbaru seputar program Kependudukan.
        </p>
      </section>

      {/* 2. AREA GRID BERITA - Menggunakan max-w-5xl & grid md:grid-cols-3 sesuai halaman beranda */}
      <section className="max-w-5xl mx-auto px-6">
        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Sedang memuat berita...</div>
        ) : beritaData.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-20 text-center border border-dashed border-gray-300 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiFileText className="text-gray-300" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
            <p className="text-gray-400 font-medium">Informasi dan berita terbaru akan segera dipublikasikan oleh Admin.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {beritaData.map((berita) => (
              <div 
                onClick={() => setSelectedNews(berita)} 
                key={berita.id} 
                className="group flex flex-col cursor-pointer bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Pembungkus Gambar */}
                <div className="h-56 rounded-2xl bg-gray-100 relative overflow-hidden mb-5 shadow-sm border border-gray-50">
                  {berita.cover_image ? (
                    <img 
                      src={berita.cover_image} 
                      alt={berita.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                      <FiImage size={40} />
                    </div>
                  )}
                </div>
                
                {/* Tanggal */}
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                  <FiClock size={12} /> {formatDate(berita.created_at)} 
                </div>

                {/* Judul Berita */}
                <h3 className="font-bold text-xl text-[#1a1a1a] leading-tight group-hover:text-[#0a1680] transition-colors line-clamp-2 mb-3">
                  {berita.title}
                </h3>

                {/* Tombol Detail */}
                <div className="mt-auto pt-4 text-sm font-bold text-[#0a1680] group-hover:text-[#f1b94c] flex items-center gap-1 transition-colors">
                  Detail
                  <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. MODAL POPUP DETAIL BERITA */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            onClick={() => setSelectedNews(null)} 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-xs p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-black shadow-md transition-all"
            >
              <FiX size={20} />
            </button>

            <div className="w-full h-64 sm:h-80 bg-gray-100 relative">
              {selectedNews.cover_image ? (
                <img 
                  src={selectedNews.cover_image} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#0a1680]/5 flex items-center justify-center">
                  <FiImage className="text-gray-200" size={56} />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-[#f1b94c] font-black uppercase tracking-wider mb-3">
                <FiCalendar /> {formatDate(selectedNews.created_at)}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
                {selectedNews.title}
              </h2>

              <hr className="border-gray-100 my-4" />

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {selectedNews.content || "Tidak ada deskripsi detail berita."}
              </p>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}