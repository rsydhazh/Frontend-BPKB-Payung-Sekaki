import Link from "next/link";
import { FiActivity, FiArrowRight, FiClock, FiImage } from "react-icons/fi";
import { getNews } from "@/services/newsService"; 
import { getDocumentation } from "@/services/documentationService"; 
import { News } from "@/types/news";
import { Documentation } from "@/types/documentation";

export default async function BerandaKependudukan() {
  let highlightBerita: News[] = []; 
  let highlightGaleri: Documentation[] = []; 

  try {
    // Ambil data Berita & Galeri secara paralel biar load-nya kenceng
    const [allNews, allGaleri] = await Promise.all([
      getNews(),
      getDocumentation()
    ]);

    // Filter berita khusus modul kependudukan (atau umum juga boleh muncul)
    highlightBerita = allNews
      .filter((n) => n.modul === "kependudukan")
      .slice(0, 3); 

    // Ambil 4 dokumentasi terbaru untuk galeri di beranda
    highlightGaleri = allGaleri.slice(0, 4);
    
  } catch (error) {
    console.error("Gagal mengambil data dari API:", error);
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-20 font-sans">
      
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

      {/* 3. GALERI KEGIATAN (Data Real dari Supabase) */}
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#1a1a1a]">Galeri Kegiatan</h2>
            <div className="h-1.5 w-20 bg-[#f1b94c] mt-2 rounded-full"></div>
          </div>
          <Link href="/kependudukan/galeri" className="text-[#0a1680] font-bold flex items-center gap-2 hover:underline group">
            Lihat Semua Galeri <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {highlightGaleri.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlightGaleri.map((item) => (
              <div key={item.id} className="group relative h-48 md:h-64 rounded-2xl overflow-hidden bg-gray-200 shadow-md border-2 border-white">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-xs font-semibold line-clamp-2">{item.title}</p>
                </div>
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

      {/* 4. BERITA TERBARU (Data Real dari Supabase) */}
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl font-black text-[#1a1a1a]">Berita Terbaru</h2>
            <p className="text-gray-500 mt-2">Informasi terkini mengenai kependudukan di Payung Sekaki.</p>
          </div>
          <Link 
            href="/kependudukan/berita" 
            className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors group"
          >
            Semua Berita 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlightBerita.length > 0 ? (
            highlightBerita.map((berita) => (
              <Link 
                href={`/kependudukan/berita/${berita.id}`} 
                key={berita.id} 
                className="group flex flex-col"
              >
                <div className="h-56 rounded-3xl bg-gray-100 relative overflow-hidden mb-5 shadow-sm border border-gray-50">
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
                <h3 className="font-bold text-xl text-[#1a1a1a] leading-tight group-hover:text-[#0a1680] transition-colors line-clamp-2">
                  {berita.title}
                </h3>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 font-medium">
              Belum ada berita kependudukan yang tersedia.
            </div>
          )}
        </div>
      </section>

    </main>
  );
}