import { FiCamera, FiImage } from "react-icons/fi";
import { Documentation } from "@/types/documentation";

export default function GaleriKeluargaPage() {
  const galeriData: Documentation[] = [];

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans pt-14">
      
      {/* HEADER PAGE */}
      <section className="pb-16 px-8 text-center max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-[#0a1680]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FiCamera className="text-3xl text-[#0a1680]" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
          Galeri <span className="text-[#0a1680]">Kegiatan</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Dokumentasi visual dari berbagai kegiatan BKR dan UPPKA di masyarakat.
        </p>
      </section>

      {/* KONTEN GALERI */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16">
        {galeriData.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl shadow-sm p-20 text-center border border-dashed border-gray-300 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiImage className="text-gray-300" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Dokumentasi</h3>
            <p className="text-gray-400 font-medium">Foto-foto kegiatan akan segera diunggah oleh Admin.</p>
          </div>

        ) : (
          
          /* GRID GAMBAR */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeriData.map((item) => (
              <div key={item.id} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl h-72 bg-gray-100 border border-gray-200 transition-all duration-300">
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
      </section>

    </main>
  );
}