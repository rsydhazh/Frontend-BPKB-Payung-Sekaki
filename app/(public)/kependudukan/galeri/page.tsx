import { FiCamera, FiImage } from "react-icons/fi";
import { Documentation } from "@/types/documentation";

export default function GaleriPage() {
  const galeriData: Documentation[] = [];

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
      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-20">
        {galeriData.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl shadow-xl p-20 text-center border border-gray-100 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiImage className="text-gray-300" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Dokumentasi</h3>
            <p className="text-gray-400 font-medium">Foto-foto kegiatan akan segera diunggah oleh Admin.</p>
          </div>

        ) : (
          
          /* GRID GAMBAR */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeriData.map((item) => (
              <div key={item.id} className="group relative h-80 rounded-3xl overflow-hidden shadow-md cursor-pointer border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a1680]/90 via-[#0a1680]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[#f1b94c] text-xs font-bold uppercase tracking-wider mb-1">
                    Dokumentasi
                  </span>
                  <h3 className="text-white font-bold text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        )}
      </section>

    </main>
  );
}