import Link from "next/link";
import { FiUsers, FiZap, FiActivity, FiArrowRight, FiClock } from "react-icons/fi";
import { getNews } from "@/services/newsService"; 
import { News } from "@/types/news";

export default async function BerandaKependudukan() {
  let highlightBerita: News[] = []; 
  try {
    const allNews = await getNews();
    highlightBerita = allNews.slice(0, 3); 
    
    console.log("Isi data berita dari API:", allNews[0]);
  } catch (error) {
    console.error("Gagal mengambil data berita:", error);
  }

  // Fungsi untuk format tanggal dari "2026-05-12T..." jadi "12 Mei 2026"
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-20 font-sans">
      
      {/* =========================================
          1. HERO SECTION & MAIN PROGRAMS 
      ========================================= */}
      <section className="relative">
        <div className="bg-[#0a1680] pt-20 pb-36 px-6 rounded-b-[3rem] text-center">
          <span className="text-[#f1b94c] text-sm font-bold tracking-widest uppercase mb-4 block">
            Selamat Datang Di
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Modul <span className="text-[#f1b94c]">Kependudukan</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Wadah untuk program-program strategis kependudukan serta program Quick Wins yang bersifat intervensi cepat Balai Penyuluh KB Payung Sekaki.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 -mt-20 grid md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-[#0a1680]/10 rounded-2xl flex items-center justify-center text-[#0a1680] mb-6">
              <FiUsers size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Program Kependudukan</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Fokus pada pengendalian kuantitas penduduk dan peningkatan kualitas administrasi kependudukan di tingkat kelurahan dan kecamatan.
            </p>
            <p className="text-sm text-gray-400 italic">Belum ada program reguler yang ditambahkan.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-[#f1b94c]/20 rounded-2xl flex items-center justify-center text-[#d99f30] mb-6">
              <FiZap size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Program Quick Wins</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Program unggulan intervensi cepat yang dirancang untuk memberikan dampak positif langsung kepada masyarakat.
            </p>
            <p className="text-sm text-gray-400 italic">Belum ada program Quick Win yang ditambahkan.</p>
          </div>
        </div>
      </section>

      {/* =========================================
          2. QUICK ACCESS / LAYANAN UNGGULAN 
      ========================================= */}
      <section className="max-w-5xl mx-auto px-6 mt-20">
        <div className="bg-gradient-to-br from-[#0a1680] to-[#1425b0] rounded-3xl p-8 md:p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <FiActivity className="absolute -right-10 -bottom-10 text-white/10" size={250} />
          
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#f1b94c] text-[#0a1680] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Fitur Baru
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-3">Cek Kesehatan Mandiri</h2>
            <p className="text-[#93b2f8] text-lg leading-relaxed">
              Skrining awal tekanan darah dan gula darah secara mandiri. Dapatkan hasil deteksi dini dan rekomendasi gizi instan hanya dalam hitungan detik.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Link 
              href="/kependudukan/cek-kesehatan" 
              className="flex items-center justify-center gap-2 bg-white text-[#0a1680] font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#f1b94c] transition-colors duration-300 w-full md:w-auto group shadow-lg"
            >
              Coba Sekarang 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          3. HIGHLIGHT BERITA TERKINI 
      ========================================= */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#1a1a1a] mb-2">Berita Terkini</h2>
            <p className="text-gray-500 text-lg">Kabar dan update terbaru seputar program Balai Penyuluh KB.</p>
          </div>
          <Link 
            href="/kependudukan/berita" 
            className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors group"
          >
            Lihat Semua Berita 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlightBerita.length > 0 ? (
            highlightBerita.map((berita: any) => (
              <Link 
                href={`/kependudukan/berita/${berita.id}`} 
                key={berita.id} 
                className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden group flex flex-col"
              >
                <div className="h-48 bg-gray-100 relative overflow-hidden shrink-0">
                   {/* Tampilkan gambar dari cover_image */}
                   {berita.cover_image ? (
                     <img 
                       src={berita.cover_image} 
                       alt={berita.title} 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                   ) : (
                     <div className="absolute inset-0 bg-[#0a1680]/5 group-hover:scale-105 transition-transform duration-500"></div>
                   )}
                   
                   {berita.category && (
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0a1680] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                       {berita.category}
                     </div>
                   )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <FiClock size={14} /> {formatDate(berita.created_at)} 
                  </div>
                  <h3 className="font-bold text-lg text-[#1a1a1a] leading-snug group-hover:text-[#0a1680] transition-colors line-clamp-3">
                    {berita.title}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400 bg-white rounded-2xl border border-gray-100">
              Belum ada berita yang diterbitkan.
            </div>
          )}
        </div>
      </section>

    </main>
  );
}