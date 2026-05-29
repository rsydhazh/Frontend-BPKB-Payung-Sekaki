"use client"; // Wajib aktif untuk mengelola state dan fetching data di client

import { useState, useEffect } from "react";
import { FiCamera, FiImage, FiClock } from "react-icons/fi";
import { Documentation } from "@/types/documentation";
import { getDocumentation } from "@/services/documentationService";

export default function UmumGaleriPage() {
  const [gallery, setGallery] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGaleri = async () => {
      try {
        const data = await getDocumentation();
        // Filter data: Hanya ambil yang kategorinya 'umum'
        const filtered = data.filter((item: any) => 
          item.modul?.toLowerCase() === "umum"
        );
        setGallery(filtered);
      } catch (error) {
        console.error("Gagal mengambil galeri umum:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGaleri();
  }, []);

  // Fungsi pembantu format tanggal Indonesia
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">

      {/* 1. HEADER */}
      <section className="bg-[#0a1680] text-white pt-14 pb-32 overflow-hidden rounded-b-[4rem] shadow-lg relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
              
          <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
              <FiCamera className="text-5xl text-[#f1b94c] mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                  Galeri <span className="text-[#f1b94c]">Kegiatan</span>
              </h1>
              <p className="text-[#93b2f8] text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                 Dokumentasi lapangan dari berbagai program dan layanan Balai KB Payung Sekaki di tengah masyarakat.
              </p>
          </div>
      </section>

      {/* 2. AREA KONTEN - LAYOUT DISAMAKAN PERSIS DENGAN KARTU BERITA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 mt-12 relative z-20">
        {isLoading ? (
          /* LOADING STATE */
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0a1680] mx-auto"></div>
            <p className="mt-4 text-gray-500 text-sm font-medium">Memuat Galeri...</p>
          </div>
        ) : gallery.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl shadow-sm p-16 text-center border border-gray-100 flex flex-col items-center justify-center max-w-3xl mx-auto">
            <FiImage className="text-gray-200 mb-4" size={40} />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Belum Ada Dokumentasi</h3>
            <p className="text-gray-400 text-sm">Foto-foto kegiatan umum akan segera diunggah oleh Admin.</p>
          </div>

        ) : (
          
          /* GRID GAMBAR (Mengikuti Struktur Komponen Berita Minimalis) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] transition-all duration-300 transform hover:-translate-y-1"
              >
                
                {/* Pembungkus Gambar - Tinggi h-56 dengan radius sudut rounded-2xl */}
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

                {/* Informasi Waktu Unggah (Di atas Judul) */}
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

    </main>
  );
}