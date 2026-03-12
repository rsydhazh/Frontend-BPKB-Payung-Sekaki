import Link from "next/link";
import { FiActivity, FiTrendingUp, FiArrowRight } from "react-icons/fi";

export default function KeluargaPage() {
  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] flex items-center overflow-hidden rounded-b-[4rem] shadow-[0_15px_40px_rgba(10,22,128,0.2)]">
        <div className="absolute inset-0 bg-linear-to-br from-[#050b40] via-[#0a1680] to-[#1425b0]"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-size-[20px_20px]`"></div>

        <div className="relative z-10 px-8 lg:px-16 max-w-4xl mt-10">
          <span className="inline-block py-1.5 px-5 rounded-full bg-[#f1b94c]/20 text-[#fbedb0] font-bold text-sm mb-6 border border-[#f1b94c]/30 tracking-widest uppercase shadow-sm">
            Selamat Datang di
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
            Modul <br />
            <span className="text-[#f1b94c]">Keluarga</span>
          </h1>
          <p className="text-[#93b2f8] text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
            Pusat informaPusat informasi dan program pemberdayaan kesejahteraan, ketahanan, serta ekonomi keluarga di wilayah Payung Sekaki.
          </p>
        </div>
      </section>

      {/* 2. GRID KARTU (Dinaikkan menimpa hero section agar sejajar) */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Kartu BKR */}
          <div className="bg-white p-10 rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <div className="w-14 h-14 bg-[#0a1680]/10 text-[#0a1680] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0a1680] group-hover:text-white transition-colors">
              <FiActivity size={28} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">Bina Keluarga Remaja (BKR)</h2>
            <p className="text-gray-500 leading-relaxed mb-8 flex-1">
              Fokus pada pembinaan orang tua dalam mendampingi tumbuh kembang, psikologi, dan pergaulan remaja.
            </p>
            <Link href="/keluarga/bkr" className="flex items-center gap-2 text-[#f1b94c] font-bold text-sm uppercase tracking-wider group-hover:text-[#0a1680] transition-colors mt-auto w-fit">
              Pelajari <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Kartu UPPKA */}
          <div className="bg-white p-10 rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] hover:-translate-y-2 transition-all duration-300 group flex flex-col">
            <div className="w-14 h-14 bg-[#f1b94c]/20 text-[#d99c2b] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#f1b94c] group-hover:text-white transition-colors">
              <FiTrendingUp size={28} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">Pemberdayaan Ekonomi (UPPKA)</h2>
            <p className="text-gray-500 leading-relaxed mb-8 flex-1">
              Program peningkatan kesejahteraan keluarga melalui pengembangan usaha ekonomi mikro dan kreatif.
            </p>
            <Link href="/keluarga/uppka" className="flex items-center gap-2 text-[#0a1680] font-bold text-sm uppercase tracking-wider group-hover:text-[#f1b94c] transition-colors mt-auto w-fit">
              Pelajari <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>

    </main>
  );
}