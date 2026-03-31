"use client";

import { useState, useEffect } from "react";
import { FiHeart, FiShield, FiCheckCircle, FiStar, FiRefreshCw } from "react-icons/fi";
import { getPrograms } from "@/services/programService";
import { Program } from "@/types/program";

export default function KeluargaPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms();
        const keluargaPrograms = data.filter((p) => p.module === "keluarga");
        setPrograms(keluargaPrograms);
      } catch (error) {
        console.error("Gagal menarik data program:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Filter ke dalam 2 kotak
  const kesejahteraanPrograms = programs.filter(p => p.category === "kesejahteraan");
  const kbPrograms = programs.filter(p => p.category === "kb");

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
            Modul <span className="text-[#f1b94c]">Keluarga</span>
          </h1>
          <p className="text-[#93b2f8] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Pusat informasi dan program pemberdayaan kesejahteraan, ketahanan, serta ekonomi keluarga di wilayah Payung Sekaki.
          </p>
        </div>
      </section>

      {/* 2. PROGRAM KELUARGA (DINAMIS) */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 -mt-10 relative z-20">
        
        {isLoading ? (
          <div className="bg-white p-12 rounded-4xl shadow-lg text-center flex flex-col items-center justify-center">
             <FiRefreshCw className="text-[#0a1680] text-4xl animate-spin mb-4" />
             <p className="text-gray-500 font-medium">Sedang menyinkronkan program dari server...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* KOTAK 1: KESEJAHTERAAN KELUARGA */}
            <div className="bg-white p-10 rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#0a1680]/10 text-[#0a1680] rounded-2xl flex items-center justify-center mb-6">
                <FiHeart size={32} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">Kesejahteraan Keluarga</h2>
              <p className="text-gray-500 leading-relaxed mb-6 pb-6 border-b border-gray-100">
                Berfokus pada kelompok kegiatan siklus hidup manusia dari balita hingga lansia, serta pemberdayaan ekonomi keluarga.
              </p>
              
              <div className="space-y-5">
                {kesejahteraanPrograms.length > 0 ? kesejahteraanPrograms.map((prog) => (
                  <div key={prog.id} className="flex items-start gap-3">
                    <FiCheckCircle className="text-[#0a1680] mt-1 shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-[#1a1a1a]">{prog.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{prog.description}</p>
                      {prog.schedule && <p className="text-xs font-bold text-[#f1b94c] mt-2">🕒 {prog.schedule}</p>}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-gray-400 italic">Belum ada program kesejahteraan yang ditambahkan.</p>
                )}
              </div>
            </div>

            {/* KOTAK 2: KELUARGA BERENCANA */}
            <div className="bg-white p-10 rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#f1b94c]/20 text-[#d99c2b] rounded-2xl flex items-center justify-center mb-6">
                <FiShield size={32} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">Keluarga Berencana</h2>
              <p className="text-gray-500 leading-relaxed mb-6 pb-6 border-b border-gray-100">
                Fokus pada pelayanan akses kontrasepsi dan edukasi kesehatan reproduksi demi terwujudnya keluarga yang sehat dan terencana.
              </p>

              <div className="space-y-5">
                {kbPrograms.length > 0 ? kbPrograms.map((prog) => (
                  <div key={prog.id} className="flex items-start gap-3">
                    <FiStar className="text-[#f1b94c] mt-1 shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-[#1a1a1a]">{prog.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{prog.description}</p>
                      {prog.schedule && <p className="text-xs font-bold text-[#0a1680] mt-2">🕒 {prog.schedule}</p>}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-gray-400 italic">Belum ada program KB yang ditambahkan.</p>
                )}
              </div>
            </div>

          </div>
        )}
      </section>

    </main>
  );
}