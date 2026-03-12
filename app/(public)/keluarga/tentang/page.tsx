import { FiInfo, FiActivity, FiTrendingUp } from "react-icons/fi";

export default function TentangKeluargaPage() {
  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans pt-14">
      
      {/* HEADER PAGE */}
      <section className="pb-16 px-8 text-center max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-[#0a1680]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FiInfo className="text-3xl text-[#0a1680]" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
          Tentang <span className="text-[#0a1680]">Modul Keluarga</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Mengenal lebih dekat program pemberdayaan dan ketahanan keluarga di Balai KB Payung Sekaki.
        </p>
      </section>

      {/* KONTEN TENTANG */}
      <section className="max-w-5xl mx-auto px-6 lg:px-16 space-y-8">
        
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-16 h-16 bg-[#0a1680]/10 text-[#0a1680] rounded-2xl flex items-center justify-center shrink-0">
            <FiActivity size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">Bina Keluarga Remaja (BKR)</h3>
            <p className="text-gray-500 leading-relaxed">
              Program BKR merupakan wadah kegiatan yang beranggotakan keluarga yang memiliki remaja usia 10-24 tahun. Tujuannya adalah meningkatkan pengetahuan dan keterampilan orang tua dalam membina tumbuh kembang, empati, dan pergaulan remaja agar terhindar dari risiko triad KRR (Pernikahan Dini, Seks Pranikah, dan NAPZA).
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-16 h-16 bg-[#f1b94c]/20 text-[#d99c2b] rounded-2xl flex items-center justify-center shrink-0">
            <FiTrendingUp size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">Usaha Peningkatan Pendapatan Keluarga Akseptor (UPPKA)</h3>
            <p className="text-gray-500 leading-relaxed">
              UPPKA adalah kelompok usaha ekonomi produktif yang beranggotakan sekumpulan anggota keluarga akseptor KB yang saling berinteraksi dalam rangka meningkatkan fungsi ekonomi keluarga. Program ini mendorong keluarga untuk mandiri secara finansial melalui inovasi dan wirausaha mikro.
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}