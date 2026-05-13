"use client";

import { useState, useEffect } from "react";
import { FiCamera, FiImage, FiCalendar } from "react-icons/fi";
import { Documentation } from "@/types/documentation";
import { getDocumentation } from "@/services/documentationService";

export default function GaleriPage() {
  const [galeriData, setGaleriData] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGaleri = async () => {
      try {
        const data = await getDocumentation();
        const filtered = data.filter((item: any) => 
          item.modul?.toLowerCase() === "kependudukan"
        );
        setGaleriData(filtered);
      } catch (error) {
        console.error("Gagal mengambil galeri:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadGaleri();
  }, []);

  // Fungsi bantu format tanggal Indonesia
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* HEADER PAGE */}
      <section className="bg-[#0a1680] text-white pt-14 pb-32 overflow-hidden rounded-b-[4rem] shadow-lg relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                     
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <FiCamera className="text-5xl text-[#f1b94c] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Galeri <span className="text-[#f1b94c]">Kegiatan</span>
          </h1>
          <p className="text-[#93b2f8] text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Dokumentasi lapangan setiap kegiatan pada program-program yang dilakukan dalam Modul Kependudukan.
          </p>
        </div>
      </section>

      {/* KONTEN GALERI */}
      {/* mt-12 (Margin Top Positif) memastikan card tidak akan pernah menyentuh/nabrak header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 mt-12 relative z-20">
        {isLoading ? (
          <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0a1680] mx-auto"></div>
            <p className="mt-4 text-gray-500 text-sm font-medium">Memuat Galeri...</p>
          </div>
        ) : galeriData.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-16 text-center border border-gray-100 flex flex-col items-center justify-center">
            <FiImage className="text-gray-200 mb-4" size={40} />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Belum Ada Dokumentasi</h3>
            <p className="text-gray-400 text-sm">Foto kegiatan kependudukan akan segera diunggah.</p>
          </div>
        ) : (
          /* Grid dengan ukuran card yang lebih kecil (max-w-sm) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {galeriData.map((item) => (
              <div key={item.id} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col w-full max-w-sm">
                
                {/* Image Area - Tinggi dikecilkan jadi h-48 */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Info Area - Padding diperkecil */}
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-[#0a1680] font-bold text-lg leading-snug line-clamp-2 min-h-[2.8rem]">
                    {item.title}
                  </h3>
                  
                  {/* Tanggal Upload */}
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium border-t border-gray-50 pt-3 mt-1">
                    <FiCalendar className="text-[#f1b94c]" size={14} />
                    <span>Diunggah: {formatDate(item.created_at || "")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}