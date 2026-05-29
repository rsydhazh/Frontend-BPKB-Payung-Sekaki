"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiActivity, FiArrowRight, FiClock, FiImage, FiX, FiCalendar } from "react-icons/fi";
import { getNews } from "@/services/newsService"; 
import { getDocumentation } from "@/services/documentationService"; 
import { News } from "@/types/news";
import { Documentation } from "@/types/documentation";

export default function BerandaKependudukan() {
  const [highlightBerita, setHighlightBerita] = useState<News[]>([]);
  const [highlightGaleri, setHighlightGaleri] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk menampung data berita yang sedang aktif di modal popup
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [allNews, allGaleri] = await Promise.all([
          getNews(),
          getDocumentation()
        ]);

        // Filter berita khusus modul kependudukan
        const filteredNews = allNews
          .filter((n) => n.modul === "kependudukan")
          .slice(0, 3);

        // Ambil data galeri dan potong menjadi 3 item agar sesuai grid md:grid-cols-3
        setHighlightBerita(filteredNews);
        setHighlightGaleri(allGaleri.slice(0, 3));
      } catch (error) {
        console.error("Gagal mengambil data dari API:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-20 font-sans relative">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#0a1680] pt-24 pb-24 px-6 rounded-b-[3.5rem] text-center shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#f1b94c] text-sm font-bold tracking-widest uppercase mb-4 block">
            Selamat Datang Di
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Modul <span className="text-[#f1b94c]">Kependudukan</span>
          </h1>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Pusat informasi strategis dan layanan intervensi cepat untuk mewujudkan keluarga berkualitas di wilayah Payung Sekaki.
          </p>
        </div>
      </section>

      {/* 2. FEATURED SERVICE (Cek Kesehatan) */}
      <section className="max-w-5xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(10,22,128,0.12)] border border-blue-50 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                <FiActivity size={24} />
              </div>
              <span className="text-[#0a1680] font-bold tracking-wide">LAYANAN UNGGULAN</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-4">Skrining Kesehatan Mandiri</h2>
            <p className="text-gray-500 text-lg max-w-lg mb-0">
              Cek tekanan darah dan gula darah Anda secara mandiri. Dapatkan hasil deteksi dini dan rekomendasi gizi instan.
            </p>
          </div>
          
          <Link 
            href="/kependudukan/cek-kesehatan" 
            className="relative z-10 shrink-0 flex items-center justify-center gap-3 bg-[#0a1680] text-white font-bold text-lg px-10 py-5 rounded-2xl hover:bg-[#f1b94c] hover:text-[#0a1680] transition-all duration-300 group shadow-xl"
          >
            Mulai Skrining
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. GALERI KEGIATAN - LAYOUT DISAMAKAN PERSIS DENGAN KARTU BERITA */}
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl font-black text-[#1a1a1a]">Galeri Kegiatan</h2>
            <p className="text-gray-500 mt-2">Potret ragam kegiatan dan pelayanan kependudukan di masyarakat.</p>
          </div>
          <Link href="/kependudukan/galeri" className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors group whitespace-nowrap">
            Lihat Semua Galeri <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a1680] mx-auto"></div>
          </div>
        ) : highlightGaleri.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {highlightGaleri.map((item) => (
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
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center">
            <FiImage size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">Belum ada dokumentasi kegiatan.</p>
          </div>
        )}
      </section>

      {/* 4. BERITA TERBARU */}
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl font-black text-[#1a1a1a]">Berita Terbaru</h2>
            <p className="text-gray-500 mt-2">Informasi terkini mengenai kependudukan di Payung Sekaki.</p>
          </div>
          <Link 
            href="/kependudukan/berita" 
            className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors group whitespace-nowrap"
          >
            Semua Berita 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a1680] mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {highlightBerita.length > 0 ? (
              highlightBerita.map((berita) => (
                <div 
                  onClick={() => setSelectedNews(berita)} 
                  key={berita.id} 
                  className="group flex flex-col cursor-pointer bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] transition-all duration-300 transform hover:-translate-y-1"
                >
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
                  
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3 font-medium">
                    <FiClock size={12} /> {formatDate(berita.created_at)} 
                  </div>

                  <h3 className="font-bold text-xl text-[#1a1a1a] leading-tight group-hover:text-[#0a1680] transition-colors line-clamp-2 mb-3">
                    {berita.title}
                  </h3>

                  <div className="mt-auto pt-4 text-sm font-bold text-[#0a1680] group-hover:text-[#f1b94c] flex items-center gap-1 transition-colors">
                    Detail
                    <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 font-medium">
                Belum ada berita kependudukan yang tersedia.
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. MODAL POPUP DETAIL BERITA */}
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