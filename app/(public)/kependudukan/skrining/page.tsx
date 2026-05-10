"use client";

import { useState } from "react";
import { FiActivity, FiHeart, FiAlertTriangle, FiCheckCircle, FiInfo, FiRefreshCw } from "react-icons/fi";

export default function SkriningKesehatanMandiriPage() {
  // STATE INPUT
  const [sistolik, setSistolik] = useState<number | "">("");
  const [diastolik, setDiastolik] = useState<number | "">("");
  const [gulaDarah, setGulaDarah] = useState<number | "">("");
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // LOGIKA STATUS TENSI
  const getTensiStatus = () => {
    const sys = Number(sistolik);
    const dia = Number(diastolik);
    
    if (sys >= 140 || dia >= 90) {
      return { label: "Hipertensi", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: <FiAlertTriangle size={24} className="text-red-500" />, message: "Tekanan darah tinggi. Segera periksakan diri ke Puskesmas." };
    }
    if (sys >= 120 || dia >= 80) {
      return { label: "Pra-Hipertensi", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", icon: <FiInfo size={24} className="text-yellow-500" />, message: "Tekanan darah mulai naik. Jaga pola makan dan kurangi garam." };
    }
    return { label: "Normal", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: <FiCheckCircle size={24} className="text-green-500" />, message: "Tekanan darah Anda normal. Pertahankan gaya hidup sehat!" };
  };

  // LOGIKA STATUS GULA DARAH PUASA
  const getGulaStatus = () => {
    const gula = Number(gulaDarah);
    
    if (gula >= 126) {
      return { label: "Indikasi Diabetes", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: <FiAlertTriangle size={24} className="text-red-500" />, message: "Gula darah puasa tinggi. Konsultasikan dengan dokter segera." };
    }
    if (gula >= 100) {
      return { label: "Pra-Diabetes", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", icon: <FiInfo size={24} className="text-yellow-500" />, message: "Gula darah di atas normal. Kurangi konsumsi manis." };
    }
    return { label: "Normal", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: <FiCheckCircle size={24} className="text-green-500" />, message: "Kadar gula darah sangat baik! Terus jaga asupan nutrisi." };
  };

  // HANDLER SUBMIT
  const handleCek = (e: React.FormEvent) => {
    e.preventDefault();
    if (sistolik && diastolik && gulaDarah) {
      setIsLoading(true);
      
      // Simulasi proses (Nanti di sini Mba Rani pasang API POST data riwayat)
      setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 800);
    }
  };

  // HANDLER RESET
  const handleReset = () => {
    setSistolik("");
    setDiastolik("");
    setGulaDarah("");
    setShowResult(false);
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">

      {/* 1. HEADER BIRU MELENGKUNG (Tetap dipertahankan) */}
      <section className="bg-[#0a1680] text-white pt-14 pb-32 overflow-hidden rounded-b-[4rem] shadow-lg relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                  
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <FiActivity className="text-5xl text-[#f1b94c] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
             Skrining Mandiri <span className="text-[#f1b94c]"> SIDAYA</span>
          </h1>
          <p className="text-[#93b2f8] text-lg max-w-2xl mx-auto font-medium leading-relaxed">
             Deteksi dini kesehatan keluarga Anda. Masukkan hasil ukur tekanan darah dan gula darah puasa untuk analisis instan.
          </p>
        </div>
      </section>

      {/* 2. KOTAK KONTEN UTAMA */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(10,22,128,0.08)] border border-gray-100 p-8 lg:p-12">
          
          {!showResult ? (
            
            /* -- TAMPILAN FORM INPUT -- */
            <form onSubmit={handleCek} className="space-y-8 animate-in fade-in duration-500">
              
              {/* Box Input Tensi */}
              <div className="bg-blue-50/40 p-6 rounded-[2rem] border border-blue-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-[#0a1680]"><FiHeart size={20} /></div>
                  <h2 className="text-lg font-extrabold text-[#1a1a1a]">Tekanan Darah (Tensi)</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sistolik (Angka Atas) *</label>
                    <div className="relative">
                      <input required type="number" min="50" max="250" value={sistolik} onChange={(e) => setSistolik(Number(e.target.value))} placeholder="Contoh: 120" className="w-full border border-gray-200 rounded-xl pl-4 pr-16 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-white transition-all text-[#1a1a1a]" />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 font-bold">mmHg</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Diastolik (Angka Bawah) *</label>
                    <div className="relative">
                      <input required type="number" min="30" max="150" value={diastolik} onChange={(e) => setDiastolik(Number(e.target.value))} placeholder="Contoh: 80" className="w-full border border-gray-200 rounded-xl pl-4 pr-16 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-white transition-all text-[#1a1a1a]" />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 font-bold">mmHg</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box Input Gula Darah */}
              <div className="bg-yellow-50/40 p-6 rounded-[2rem] border border-yellow-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-yellow-600"><FiActivity size={20} /></div>
                  <h2 className="text-lg font-extrabold text-[#1a1a1a]">Gula Darah Puasa (GDP)</h2>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kadar Gula Darah *</label>
                  <div className="relative">
                    <input required type="number" min="20" max="600" value={gulaDarah} onChange={(e) => setGulaDarah(Number(e.target.value))} placeholder="Contoh: 95" className="w-full border border-gray-200 rounded-xl pl-4 pr-16 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#f1b94c]/50 focus:border-[#f1b94c] bg-white transition-all text-[#1a1a1a]" />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 font-bold">mg/dL</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1"><FiInfo size={14}/> Pastikan diukur setelah puasa 8-10 jam.</p>
                </div>
              </div>

              {/* Tombol Submit */}
              <div className="pt-2">
                <button type="submit" disabled={isLoading} className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all shadow-lg transform active:scale-95 text-lg ${isLoading ? 'bg-gray-400 cursor-wait' : 'bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30'}`}>
                  {isLoading ? "Menganalisis..." : "Cek Status Kesehatan Saya"}
                </button>
              </div>
            </form>

          ) : (

            /* -- TAMPILAN HASIL SKRINING -- */
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Hasil Analisis SIDAYA</h2>
                <p className="text-gray-500">Berdasarkan data ukur yang Anda masukkan.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Kartu Hasil Tensi */}
                <div className={`p-8 rounded-[2rem] border-2 flex flex-col items-center text-center transition-all ${getTensiStatus().bg} ${getTensiStatus().border}`}>
                  <div className="bg-white p-4 rounded-full shadow-sm mb-5 transform -translate-y-4">
                    {getTensiStatus().icon}
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Tekanan Darah</p>
                  <div className="text-4xl font-black text-gray-800 mb-2">{sistolik} <span className="text-2xl text-gray-400 font-bold">/ {diastolik}</span></div>
                  <div className={`text-xl font-extrabold mb-4 ${getTensiStatus().color}`}>{getTensiStatus().label}</div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{getTensiStatus().message}</p>
                </div>

                {/* Kartu Hasil Gula Darah */}
                <div className={`p-8 rounded-[2rem] border-2 flex flex-col items-center text-center transition-all ${getGulaStatus().bg} ${getGulaStatus().border}`}>
                  <div className="bg-white p-4 rounded-full shadow-sm mb-5 transform -translate-y-4">
                    {getGulaStatus().icon}
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Gula Darah Puasa</p>
                  <div className="text-4xl font-black text-gray-800 mb-2">{gulaDarah}</div>
                  <div className={`text-xl font-extrabold mb-4 ${getGulaStatus().color}`}>{getGulaStatus().label}</div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{getGulaStatus().message}</p>
                </div>
              </div>

              {/* Info Medis */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-start gap-3 mt-4">
                <FiInfo className="text-gray-400 shrink-0 mt-0.5" size={20} />
                <p className="text-[13px] text-gray-500 leading-relaxed text-justify">
                  <strong className="text-gray-700">Perhatian:</strong> Hasil ini merupakan deteksi dini (skrining) dan tidak menggantikan diagnosis medis resmi. Jika Anda merasa tidak sehat, segera kunjungi fasilitas kesehatan atau Puskesmas terdekat.
                </p>
              </div>

              {/* Tombol Ulang */}
              <button onClick={handleReset} className="w-full py-4 flex items-center justify-center gap-2 rounded-xl font-bold text-[#0a1680] bg-white border-2 border-[#0a1680]/20 hover:bg-gray-50 hover:border-[#0a1680] transition-all transform active:scale-95 text-lg">
                <FiRefreshCw /> Lakukan Skrining Ulang
              </button>
            </div>

          )}
        </div>
      </div>
    </main>
  );
}