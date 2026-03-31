import Link from "next/link";
import { FaUsers, FaChild, FaHome } from "react-icons/fa";
import { MdPublic } from "react-icons/md";

// 1. DATA ARRAY
const portalModules = [
  {
    id: "umum",
    title: "Modul Umum",
    description: "Informasi kependudukan, program KB, kesejahteraan keluarga, berita, galeri, dan data Posyandu wilayah Payung Sekaki.",
    icon: FaUsers,
    href: "/umum",
  },
  {
    id: "kependudukan",
    title: "Modul Kependudukan",
    description: "Program pembinaan anak dan lansia, dokumentasi kegiatan, serta berita khusus Kependudukan.",
    icon: FaChild,
    href: "/kependudukan",
  },
  {
    id: "keluarga",
    title: "Modul Keluarga",
    description: "Informasi dan program pembinaan keluarga harmonis, kegiatan kesejahteraan, serta berita kegiatan.",
    icon: FaHome,
    href: "/keluarga",
  },
];

export default function PortalPage() {
  return (
    <div className="min-h-screen relative bg-[#fcfdff] font-sans overflow-hidden">
      
      {/* 2. HERO SECTION */}
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-[#0a1680] rounded-b-[4rem] z-0 shadow-[0_10px_30px_rgba(10,22,128,0.15)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 rounded-b-[4rem]"></div>
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="flex justify-between items-center px-8 lg:px-16 py-8">
          <div className="flex items-center gap-3 text-white group cursor-pointer">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all">
              <MdPublic className="text-4xl text-[#f1b94c]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                Portal BPKB Payung Sekaki
              </h1>
              <p className="text-[#93b2f8] text-sm font-medium tracking-wide">
                Pusat Informasi & Pelayanan Masyarakat
              </p>
            </div>
          </div>

          <Link
            href="/login-admin"
            className="hidden sm:flex items-center gap-2 bg-white text-[#0a1680] hover:bg-[#f1b94c] hover:text-white transition-all duration-300 font-bold px-7 py-3 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_25px_rgba(241,185,76,0.4)] transform hover:-translate-y-1"
          >
            Login Admin
          </Link>
        </header>

        {/* 3. KARTU MENGAMBANG*/}
        <main className="flex-1 flex items-center justify-center px-6 mt-12 lg:mt-6 pb-16">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl w-full">
            
            {/* 4. MAPPING DATA */}
            {portalModules.map((module) => (
              <Link
                key={module.id}
                href={module.href}
                className="group relative bg-white p-10 rounded-3xl transition-all duration-500 transform hover:-translate-y-4 shadow-[0_15px_40px_-15px_rgba(10,22,128,0.2)] hover:shadow-[0_30px_60px_-15px_rgba(10,22,128,0.3)] border border-gray-100 flex flex-col items-center text-center overflow-hidden"
              >

                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white to-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                {/* Ikon Modul */}
                <div className="w-24 h-24 mb-8 bg-[#fcfdff] border border-gray-100 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-[#0a1680] transition-colors duration-500">
                  <module.icon className="text-5xl text-[#0a1680] group-hover:text-[#f1b94c] transition-colors duration-500 drop-shadow-sm" />
                </div>

                {/* Judul & Deskripsi */}
                <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-4 group-hover:text-[#0a1680] transition-colors">
                  {module.title}
                </h2>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {module.description}
                </p>

                {/* Tombol semu untuk indikasi aksi */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-[#f1b94c] font-bold text-sm uppercase tracking-wider flex items-center gap-1">
                    Masuk Modul &rarr;
                  </span>
                </div>
              </Link>
            ))}

          </div>
        </main>

      </div>
    </div>
  );
}