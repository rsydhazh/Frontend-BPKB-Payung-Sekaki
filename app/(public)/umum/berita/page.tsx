import Link from "next/link";
import { FiFileText, FiCalendar, FiArrowRight } from "react-icons/fi";
import { News } from "@/types/news";

export default function UmumBeritaPage() {
  const news: News[] = [];

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* 1. HEADER */}
      <section className="bg-[#0a1680] pt-16 pb-24 text-center px-8 rounded-b-[4rem] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <FiFileText className="mx-auto text-[#f1b94c] mb-6" size={40} />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Berita & <span className="text-[#f1b94c]">Informasi</span>
          </h1>
          <p className="text-[#93b2f8] text-lg font-medium leading-relaxed">
            Kumpulan artikel, pengumuman, dan berita terbaru seputar kegiatan Balai KB Payung Sekaki.
          </p>
        </div>
      </section>

      {/* 2. AREA KONTEN */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 -mt-10 relative z-20">
        {news.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl shadow-xl p-20 text-center border border-gray-100 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiFileText className="text-gray-300" size={48} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-2">Belum Ada Berita</h3>
            <p className="text-gray-400 font-medium">Informasi dan berita terbaru akan segera dipublikasikan oleh Admin.</p>
          </div>

        ) : (
          
          /* GRID BERITA */
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link href={`/umum/berita/${item.id}`} key={item.id} className="group bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden">
                
                {/* Area Foto Berita */}
                <div className="h-48 bg-gray-100 relative overflow-hidden border-b border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.cover_image || "https://via.placeholder.com/400x300?text=Foto+Berita"} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Kategori Berita */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#0a1680] rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {item.category || "Umum"}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-bold mb-4">
                    <FiCalendar className="text-[#f1b94c]" /> 
                    {/* Jika ada created_at pakai itu, jika tidak beri teks statis sementara */}
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "Tanggal Dipublikasi"}
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-[#1a1a1a] mb-4 group-hover:text-[#0a1680] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-8 flex-1 line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>
                  
                  <div className="text-[#0a1680] font-bold text-sm flex items-center gap-2 mt-auto group-hover:text-[#f1b94c] transition-colors">
                    Baca Lengkap <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}