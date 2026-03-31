import Link from "next/link";
import { FiFileText, FiCalendar, FiArrowRight } from "react-icons/fi";
import { News } from "@/types/news";

export default function UmumBeritaPage() {
  const news: News[] = [];

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* 1. HEADER */}
      <section className="pt-14 pb-32 px-8 text-center max-w-3xl mx-auto relative">
        <div className="w-16 h-16 bg-[#0a1680]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FiFileText className="text-3xl text-[#0a1680]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">
          Berita & <span className="text-[#0a1680]">Informasi</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Kumpulan artikel, pengumuman, dan berita terbaru seputar kegiatan Balai Penyuluh KB Payung Sekaki.
        </p>
      </section>

      {/* 2. AREA KONTEN */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16">
        {news.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl shadow-sm p-20 text-center border border-dashed border-gray-300 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiFileText className="text-gray-300" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
            <p className="text-gray-400 font-medium">Informasi dan berita terbaru akan segera dipublikasikan oleh Admin.</p>
          </div>

        ) : (
          
          /* GRID BERITA (Gaya Disamakan dengan Kependudukan) */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link href={`/umum/berita/${item.id}`} key={item.id} className="group bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(10,22,128,0.12)] border border-gray-100 flex flex-col overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                
                <div className="h-56 overflow-hidden relative bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.cover_image || "https://via.placeholder.com/400x300?text=Foto+Berita"} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Kategori Berita (Khusus Modul Umum) */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#0a1680] rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {item.category || "Umum"}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#f1b94c] font-bold mb-3 uppercase tracking-wider">
                    <FiCalendar /> 
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "Tanggal Dipublikasi"}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#0a1680] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                    {item.content}
                  </p>
                  
                  <div className="text-[#0a1680] font-bold text-sm flex items-center gap-2 mt-auto">
                    Baca Artikel <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        )}
      </section>

    </main>
  );
}