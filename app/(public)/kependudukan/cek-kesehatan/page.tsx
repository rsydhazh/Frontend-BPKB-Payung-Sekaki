"use client";

import { useState } from "react";
import { FiActivity, FiHeart, FiDroplet, FiInfo, FiCheckCircle } from "react-icons/fi";

export default function CekKesehatanPage() {
  const [sistolik, setSistolik] = useState("");
  const [diastolik, setDiastolik] = useState("");
  const [gula, setGula] = useState("");
  
  const [hasil, setHasil] = useState<{
    statusTD: string;
    rekoTD: string;
    statusGula: string;
    rekoGula: string;
  } | null>(null);

  const hitungKesehatan = (e: React.FormEvent) => {
    e.preventDefault();
    const sys = parseInt(sistolik);
    const dia = parseInt(diastolik);
    const gl = parseInt(gula);

    let statusTD = "";
    let rekoTD = "";
    // Logika Tekanan Darah
    if (sys < 90 || dia < 60) {
      statusTD = "Hipotensi (Rendah)";
      rekoTD = "Perbanyak asupan cairan, tambahkan sedikit ekstra garam pada makanan, makan porsi kecil tapi sering, dan hindari berdiri secara tiba-tiba.";
    } else if (sys > 120 || dia > 80) {
      statusTD = "Hipertensi (Tinggi)";
      rekoTD = "Terapkan Diet DASH: Kurangi asupan garam (natrium) dan makanan olahan/kaleng. Perbanyak sayuran, buah-buahan, dan biji-bijian utuh.";
    } else {
      statusTD = "Normal";
      rekoTD = "Bagus! Pertahankan pola makan gizi seimbang, kurangi stres, dan lakukan aktivitas fisik secara teratur.";
    }

    let statusGula = "";
    let rekoGula = "";
    // Logika Gula Darah Sewaktu (GDS)
    if (gl < 70) {
      statusGula = "Hipoglikemia (Rendah)";
      rekoGula = "Segera konsumsi karbohidrat cepat serap (seperti teh manis, jus, atau permen). Setelah membaik, konsumsi karbohidrat kompleks agar stabil.";
    } else if (gl > 140) {
      statusGula = "Hiperglikemia (Tinggi)";
      rekoGula = "Batasi konsumsi karbohidrat sederhana dan makanan/minuman manis. Perbanyak makanan berserat tinggi seperti sayuran dan kacang-kacangan.";
    } else {
      statusGula = "Normal";
      rekoGula = "Hebat! Pertahankan batasan konsumsi gula harian maksimal 4 sendok makan dan jaga berat badan ideal.";
    }

    setHasil({ statusTD, rekoTD, statusGula, rekoGula });
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-[#0a1680] mb-4">Cek Kesehatan Mandiri</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Pantau kondisi tekanan darah dan gula darah Anda. Dapatkan rekomendasi gizi instan berdasarkan hasil pengukuran.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form Input Section */}
          <div className="bg-white p-8 rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#0a1680]/10 text-[#0a1680] rounded-xl">
                <FiActivity size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Input Data</h2>
            </div>

            <form onSubmit={hitungKesehatan} className="space-y-6">
              {/* Input Tekanan Darah */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 font-bold text-gray-700">
                  <FiHeart className="text-red-500" /> Tekanan Darah (mmHg)
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      type="number" required
                      placeholder="Sistolik (misal: 120)" 
                      value={sistolik} onChange={(e) => setSistolik(e.target.value)}
                      className="text-sm w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a1680] focus:border-transparent outline-none transition-all"
                    />
                    <span className="text-xs text-gray-400 mt-1 ml-1">Angka atas</span>
                  </div>
                  <div className="flex-1">
                    <input 
                      type="number" required
                      placeholder="Diastolik (misal: 80)" 
                      value={diastolik} onChange={(e) => setDiastolik(e.target.value)}
                      className="text-sm w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a1680] focus:border-transparent outline-none transition-all"
                    />
                    <span className="text-xs text-gray-400 mt-1 ml-1">Angka bawah</span>
                  </div>
                </div>
              </div>

              {/* Input Gula Darah */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 font-bold text-gray-700">
                  <FiDroplet className="text-blue-500" /> Gula Darah (mg/dL)
                </label>
                <input 
                  type="number" required
                  placeholder="Masukkan angka (misal: 110)" 
                  value={gula} onChange={(e) => setGula(e.target.value)}
                  className="text-sm w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a1680] focus:border-transparent outline-none transition-all"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-[#0a1680] hover:bg-[#1425b0] text-white font-bold rounded-xl shadow-lg transition-colors duration-300 flex justify-center items-center gap-2"
              >
                <FiCheckCircle size={20} /> Cek Hasil Sekarang
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-[#0a1680] p-8 rounded-4xl shadow-xl text-white relative overflow-hidden h-full min-h-[400px]">
            <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4">
              <FiActivity size={150} />
            </div>
            
            <h2 className="text-2xl font-bold mb-6 text-[#f1b94c]">Hasil & Rekomendasi</h2>

            {!hasil ? (
              <div className="flex flex-col items-center justify-center h-48 opacity-70">
                <FiInfo size={40} className="mb-3" />
                <p className="text-center">Silakan masukkan data pada form di samping untuk melihat hasil analisis dan rekomendasi gizi.</p>
              </div>
            ) : (
              <div className="space-y-6 relative z-10 animate-fade-in-up">
                
                {/* Hasil Tekanan Darah */}
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-200">Tekanan Darah:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      hasil.statusTD === "Normal" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                    }`}>
                      {hasil.statusTD}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#93b2f8]">
                    <span className="font-bold text-white block mb-1">Rekomendasi Gizi:</span>
                    {hasil.rekoTD}
                  </p>
                </div>

                {/* Hasil Gula Darah */}
                <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-200">Gula Darah:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      hasil.statusGula === "Normal" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                    }`}>
                      {hasil.statusGula}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#93b2f8]">
                    <span className="font-bold text-white block mb-1">Rekomendasi Gizi:</span>
                    {hasil.rekoGula}
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}