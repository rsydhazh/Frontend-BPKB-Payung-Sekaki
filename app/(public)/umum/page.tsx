import Link from "next/link";
import { FiArrowRight, FiFileText, FiImage } from "react-icons/fi";
import { News } from "@/types/news"; 
import { Documentation } from "@/types/documentation"; 

const beritaTerbaru: News[] = [];
const dokumentasiTerbaru: Documentation[] = [];

export default function UmumHomePage() {
  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* 1. HERO SECTION */}

      <section className="relative w-full pt-14 pb-28 overflow-hidden rounded-b-[4rem] shadow-[0_10px_30px_rgba(10,22,128,0.15)]">
        <div className="absolute inset-0 bg-linear-to-br from-[#050b40] via-[#0a1680] to-[#1425b0]"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,#ffffff_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-[#fbedb0] font-bold text-xs mb-6 border border-white/10 tracking-widest uppercase backdrop-blur-sm">
            Selamat Datang di
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-md">
            Balai Penyuluh KB <span className="text-[#f1b94c]">Payung Sekaki</span>
          </h1>
          <p className="text-[#93b2f8] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Pusat informasi kegiatan, layanan kependudukan, dan program kesejahteraan masyarakat secara transparan dan akurat.
          </p>
        </div>
      </section>

      {/* 2. CUPLIKAN BERITA TERBARU */}
      <section className="pt-20 px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-2 flex items-center gap-3">
              Berita Terbaru <div className="h-1 w-12 bg-[#f1b94c] rounded-full"></div>
            </h2>
            <p className="text-gray-500 font-medium">Informasi dan pengumuman terkini dari balai kami.</p>
          </div>
          <Link href="/umum/berita" className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors whitespace-nowrap">
            Lihat Semua Berita <FiArrowRight />
          </Link>
        </div>

        {beritaTerbaru.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiFileText className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
            <p className="text-gray-400 font-medium max-w-md mx-auto">Berita terbaru akan segera diperbarui oleh Admin melalui Dashboard.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Nanti kode maping kartu berita diletakkan di sini saat API sudah siap */}
          </div>
        )}
      </section>

      {/* 3. CUPLIKAN DOKUMENTASI / GALERI */}
      <section className="pt-20 px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-2 flex items-center gap-3">
              Dokumentasi Kegiatan <div className="h-1 w-12 bg-[#f1b94c] rounded-full"></div>
            </h2>
            <p className="text-gray-500 font-medium">Potret ragam kegiatan dan pelayanan di masyarakat.</p>
          </div>
          <Link href="/umum/galeri" className="flex items-center gap-2 text-[#0a1680] font-bold hover:text-[#f1b94c] transition-colors whitespace-nowrap">
            Lihat Semua Galeri <FiArrowRight />
          </Link>
        </div>

        {dokumentasiTerbaru.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiImage className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Dokumentasi</h3>
            <p className="text-gray-400 font-medium max-w-md mx-auto">Foto-foto kegiatan terbaru akan segera diunggah oleh Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Nanti kode maping foto galeri diletakkan di sini saat API sudah siap */}
          </div>
        )}
      </section>

    </main>
  );
}