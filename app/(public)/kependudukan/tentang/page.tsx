import { FiInfo, FiTarget, FiUsers, FiZap, FiCheckCircle } from "react-icons/fi";

export default function TentangKependudukanPage() {
  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans pt-14">
      
      {/* HEADER BIRU */}
      <section className="bg-[#0a1680] text-white pt-14 pb-32 overflow-hidden rounded-b-[4rem] shadow-lg relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <FiInfo className="text-5xl text-[#f1b94c] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Tentang <span className="text-[#f1b94c]">Kependudukan</span>
          </h1>
          <p className="text-[#93b2f8] text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Mengenal lebih dekat wadah program strategis kependudukan dan intervensi cepat (Quick Wins) di wilayah binaan.
          </p>
        </div>
      </section>

      {/* KONTEN   */}
      <section className="max-w-4xl mx-auto px-6 lg:px-16 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(10,22,128,0.08)] border border-gray-100 p-8 lg:p-12 space-y-12">
          
          {/* Fokus Program Kependudukan */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0a1680]/10 rounded-xl flex items-center justify-center shrink-0">
                <FiUsers className="text-[#0a1680] text-xl" />
              </div>
              Fokus Program Kependudukan
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg text-justify md:pl-16 mb-6">
              Kelompok Kependudukan hadir sebagai wadah untuk program-program strategis yang berfokus pada pengendalian kuantitas penduduk, <strong>update</strong> data mikro secara berkala, dan pembangunan terintegrasi di tingkat desa.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 md:ml-14">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <FiCheckCircle className="text-[#0a1680] mt-1 shrink-0 text-lg" />
                  <div>
                    <span className="text-gray-800 font-bold block mb-1">Kampung Keluarga Berkualitas (Kampung KB)</span>
                    <span className="text-gray-600 text-sm">Program pembangunan terintegrasi di tingkat desa untuk meningkatkan kualitas hidup masyarakat.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <FiCheckCircle className="text-[#0a1680] mt-1 shrink-0 text-lg" />
                  <div>
                    <span className="text-gray-800 font-bold block mb-1">Rumah Data Kependudukan (Rumah Dataku)</span>
                    <span className="text-gray-600 text-sm">Pusat data mikro kependudukan sebagai landasan perencanaan dan intervensi program.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Quick Win */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f1b94c]/20 rounded-xl flex items-center justify-center shrink-0">
                <FiZap className="text-[#d99c2b] text-xl" />
              </div>
              Inisiatif Quick Wins
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg text-justify md:pl-16 mb-6">
              Selain program reguler, kami juga menjalankan <strong>Program Unggulan Quick Wins</strong>. Ini adalah inisiatif intervensi cepat yang dirancang khusus untuk memberikan dampak positif secara langsung dan terukur.
            </p>
            
            {/* Poin-poin Quick Win */}
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 md:ml-14">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <FiTarget className="text-[#0a1680] mt-1 shrink-0 text-xl" />
                  <span className="text-gray-700 font-medium"><strong>Genting:</strong> Gerakan Orang Tua Asuh untuk intervensi gizi keluarga rentan stunting.</span>
                </li>
                <li className="flex items-start gap-4">
                  <FiTarget className="text-[#0a1680] mt-1 shrink-0 text-xl" />
                  <span className="text-gray-700 font-medium"><strong>Tamasya:</strong> Taman Asuh Sayang Anak untuk penyediaan tempat penitipan yang edukatif.</span>
                </li>
                <li className="flex items-start gap-4">
                  <FiTarget className="text-[#0a1680] mt-1 shrink-0 text-xl" />
                  <span className="text-gray-700 font-medium"><strong>Sidaya:</strong> Lansia Berdaya melalui pendampingan perawatan agar lansia tetap produktif.</span>
                </li>
                <li className="flex items-start gap-4">
                  <FiTarget className="text-[#0a1680] mt-1 shrink-0 text-xl" />
                  <span className="text-gray-700 font-medium"><strong>Ai-Superapps:</strong> Platform digital terintegrasi untuk layanan keluarga dan konsultasi.</span>
                </li>
                <li className="flex items-start gap-4">
                  <FiTarget className="text-[#0a1680] mt-1 shrink-0 text-xl" />
                  <span className="text-gray-700 font-medium"><strong>Gati:</strong> Gerakan Ayah Teladan Indonesia untuk penguatan peran ayah dalam pengasuhan.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}