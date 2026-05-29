"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiFileText, FiImage, FiCalendar, FiX, FiClock } from "react-icons/fi";
import { News } from "@/types/news"; 
import { Documentation } from "@/types/documentation"; 
import { getNews } from "@/services/newsService";
import { getDocumentation } from "@/services/documentationService";

export default function UmumHomePage() {
  const [beritaTerbaru, setBeritaTerbaru] = useState<News[]>([]);
  const [dokumentasiTerbaru, setDokumentasiTerbaru] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State baru untuk mengontrol berita mana yang sedang dibuka di popup
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [newsData, galleryData] = await Promise.all([
          getNews(),
          getDocumentation()
        ]);

        const filteredNews = newsData
          .filter((item: any) => item.modul?.toLowerCase() === "umum" || item.category?.toLowerCase() === "umum")
          .slice(0, 3);

        const filteredGallery = galleryData
          .filter((item: any) => item.modul?.toLowerCase() === "umum")
          .slice(0, 3); // Disesuaikan menjadi 3 item agar pas dengan grid md:grid-cols-3

        setBeritaTerbaru(filteredNews);
        setDokumentasiTerbaru(filteredGallery);
      } catch (error) {
        console.error("Gagal memuat data beranda umum:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-14 pb-28 overflow-hidden rounded-b-[4rem] shadow-[0_10px_30px_rgba(10,22,128,0.15)]">
        <div className="absolute inset-0 bg-linear-to-br from-[#050b40] via-[#0a1680] to-[#1425b0]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,#ffffff_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-[#fbedb0] font-bold text-xs mb-6 border border-white/10 tracking-widest uppercase backdrop-blur-sm">
            Selamat Datang di
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-md">
            Balai Penyuluh KB <span className="text-[#f1b94c]">Payung Sekaki</span>
          </h1>
          <p className="text-[#93b2f8] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Pusat informasi kegiatan, layanan kependudukan, dan program kesejahteraan masyarakat secara transparan dan akurat.
          </p>
        </div>
      </section>

      {/* 2. CUPLIKAN BERITA TERBARU */}
      <section className="pt-20 px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-2 flex items-center gap-3">
              Berita Terbaru <div className="h-1 w-12 bg-[#f1b94c] rounded-full"></div>
            </h2>
            <p className="text-gray-500 font-medium">Informasi dan pengumuman terkini dari balai kami.</p>
          </div>
          <Link href="/umum/berita" className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors whitespace-nowrap group">
            Lihat Semua Berita <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a1680] mx-auto"></div>
          </div>
        ) : beritaTerbaru.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiFileText className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
            <p className="text-gray-400 font-medium max-w-md mx-auto">Berita terbaru akan segera diperbarui oleh Admin melalui Dashboard.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {beritaTerbaru.map((item) => (
              <div 
                onClick={() => setSelectedNews(item)}
                key={item.id} 
                className="group flex flex-col cursor-pointer bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Pembungkus Gambar */}
                <div className="h-56 rounded-2xl bg-gray-100 relative overflow-hidden mb-5 shadow-sm border border-gray-50">
                  {item.cover_image ? (
                    <img 
                      src={item.cover_image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                      <FiImage size={40} />
                    </div>
                  )}
                </div>

                {/* Tanggal Rilis */}
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                  <FiClock size={12} /> {formatDate(item.created_at)} 
                </div>

                {/* Judul Berita */}
                <h3 className="font-bold text-xl text-[#1a1a1a] leading-tight group-hover:text-[#0a1680] transition-colors line-clamp-2 mb-3">
                  {item.title}
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

      {/* 3. CUPLIKAN DOKUMENTASI / GALERI - LAYOUT SEKARANG SAMA PERSIS DENGAN BERITA */}
      <section className="pt-20 px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-2 flex items-center gap-3">
              Dokumentasi Kegiatan <div className="h-1 w-12 bg-[#f1b94c] rounded-full"></div>
            </h2>
            <p className="text-gray-500 font-medium">Potret ragam kegiatan dan pelayanan di masyarakat.</p>
          </div>
          <Link href="/umum/galeri" className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors whitespace-nowrap group">
            Lihat Semua Galeri <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a1680] mx-auto"></div>
          </div>
        ) : dokumentasiTerbaru.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiImage className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Dokumentasi</h3>
            <p className="text-gray-400 font-medium max-w-md mx-auto">Foto-foto kegiatan terbaru akan segera diunggah oleh Admin.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {dokumentasiTerbaru.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Pembungkus Gambar */}
                <div className="h-56 rounded-2xl bg-gray-100 relative overflow-hidden mb-5 shadow-sm border border-gray-50">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                      <FiImage size={40} />
                    </div>
                  )}
                </div>

                {/* Informasi Waktu Unggah */}
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                  <FiClock size={12} /> Diunggah: {formatDate(item.created_at)} 
                </div>

                {/* Judul Dokumentasi */}
                <h3 className="font-bold text-xl text-[#1a1a1a] leading-tight group-hover:text-[#0a1680] transition-colors line-clamp-2 mb-3">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. MODAL / POPUP DETAIL BERITA */}
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