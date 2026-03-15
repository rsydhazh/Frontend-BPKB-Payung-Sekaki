import { FiCamera, FiImage } from "react-icons/fi";
import { Documentation } from "@/types/documentation";

export default function UmumGaleriPage() {
  const gallery: Documentation[] = []; 

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans pt-14">
      
      {/* 1. HEADER*/}
      <section className="bg-[#0a1680] text-white pt-24 pb-20 overflow-hidden rounded-b-[4rem] shadow-lg relative mb-16">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <FiCamera className="text-4xl text-[#f1b94c] mx-auto mb-6" />
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Galeri <span className="text-[#f1b94c]">Kegiatan</span>
          </h1>
          <p className="text-[#93b2f8] text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Dokumentasi visual dari berbagai program dan layanan Balai KB Payung Sekaki di tengah masyarakat.
          </p>
        </div>
      </section>

      {/* 2. AREA KONTEN */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {gallery.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-20 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiImage className="text-gray-300" size={48} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-2">Belum Ada Dokumentasi</h3>
            <p className="text-gray-400 font-medium">Foto-foto kegiatan akan segera diunggah oleh Admin.</p>
          </div>

        ) : (
          
          /* GRID GAMBAR */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, idx) => (
              <div key={idx} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl h-72 bg-gray-100 border border-gray-200 transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a1680]/90 via-[#0a1680]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="inline-block px-2 py-1 bg-[#f1b94c] text-[#1a1a1a] text-xs font-bold rounded mb-2">Dokumentasi</span>
                    <h3 className="text-white font-bold text-lg leading-snug">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </main>
  );
}