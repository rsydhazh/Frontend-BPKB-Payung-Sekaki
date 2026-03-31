import { FiFileText, FiHeart, FiShield, FiCheckCircle } from "react-icons/fi";

export default function TentangKeluargaPage() {
  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans pt-14">
      
      {/* HEADER  */}
      <section className="pb-16 px-8 text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-[#0a1680]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiFileText className="text-3xl text-[#0a1680]" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
                Tentang <span className="text-[#0a1680]">Modul Keluarga</span>
              </h1>
              <p className="text-gray-500 text-lg font-medium">
                Mengenal lebih dekat program pemberdayaan, ketahanan, dan keluarga berencana di Balai KB Payung Sekaki.
              </p>
      </section>

      {/* KONTEN MENGAMBANG */}
      <section className="max-w-4xl mx-auto px-6 lg:px-16 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(10,22,128,0.08)] border border-gray-100 p-8 lg:p-12 space-y-12">
          
          {/* Fokus 1: Kesejahteraan Keluarga */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0a1680]/10 rounded-xl flex items-center justify-center shrink-0">
                <FiHeart className="text-[#0a1680] text-xl" />
              </div>
              Kesejahteraan Keluarga (Kelompok Kegiatan)
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg text-justify md:pl-16 mb-6">
              Program ini dirancang khusus untuk mengawal siklus hidup manusia secara komprehensif, mulai dari balita, remaja, hingga lansia, serta meningkatkan kemandirian ekonomi melalui usaha produktif keluarga.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 md:ml-14">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <FiCheckCircle className="text-[#0a1680] mt-1 shrink-0 text-lg" />
                  <div>
                    <span className="text-gray-800 font-bold block mb-1">Bina Keluarga (BKB, BKR, BKL)</span>
                    <span className="text-gray-600 text-sm">Peningkatan pola asuh balita, pembinaan remaja oleh orang tua, serta pendampingan keluarga lansia.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FiCheckCircle className="text-[#0a1680] mt-1 shrink-0 text-lg" />
                  <div>
                    <span className="text-gray-800 font-bold block mb-1">PIK-R</span>
                    <span className="text-gray-600 text-sm">Wadah khusus untuk konseling dan informasi kesehatan reproduksi bagi remaja.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FiCheckCircle className="text-[#0a1680] mt-1 shrink-0 text-lg" />
                  <div>
                    <span className="text-gray-800 font-bold block mb-1">Pemberdayaan Ekonomi (UPPKA)</span>
                    <span className="text-gray-600 text-sm">Usaha Peningkatan Pendapatan Keluarga Akseptor untuk mewujudkan kemandirian finansial.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FiCheckCircle className="text-[#0a1680] mt-1 shrink-0 text-lg" />
                  <div>
                    <span className="text-gray-800 font-bold block mb-1">Pemenuhan Nutrisi (DASHAT & MBG)</span>
                    <span className="text-gray-600 text-sm">Dapur Sehat Atasi Stunting berbasis pangan lokal dan program Makan Bergizi Gratis.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Fokus 2: Keluarga Berencana */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f1b94c]/20 rounded-xl flex items-center justify-center shrink-0">
                <FiShield className="text-[#d99c2b] text-xl" />
              </div>
              Keluarga Berencana (KB)
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg text-justify md:pl-16 mb-6">
              Pelayanan Keluarga Berencana dan Kesehatan Reproduksi (KBKR) hadir untuk menjamin setiap keluarga mendapatkan akses kontrasepsi yang komprehensif, aman, dan disesuaikan dengan kebutuhan perencanaan keluarga.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}