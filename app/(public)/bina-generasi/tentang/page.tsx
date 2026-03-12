import { FiSmile, FiActivity, FiShield, FiUsers } from "react-icons/fi";

const fokusProgram = [
  { icon: FiSmile, title: "Bina Keluarga Balita (BKB)", desc: "Pembinaan orang tua dalam pengasuhan dan tumbuh kembang anak balita secara komprehensif." },
  { icon: FiActivity, title: "Bina Keluarga Lansia (BKL)", desc: "Meningkatkan kesejahteraan, kemandirian, dan kesehatan lansia melalui pendampingan terpadu." },
  { icon: FiShield, title: "Edukasi Kesehatan", desc: "Penyuluhan kesehatan spesifik yang berfokus pada pencegahan penyakit untuk anak dan lansia." },
  { icon: FiUsers, title: "Kegiatan Sosial", desc: "Pemberdayaan keluarga melalui kegiatan interaktif yang mempererat keharmonisan lintas generasi." },
];

export default function TentangBinaGenerasiPage() {
  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      <section className="pt-14 pb-16 px-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-6">
          Program <span className="text-[#0a1680]">Bina Generasi</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium mb-12">
          Komitmen Balai KB Payung Sekaki dalam merangkul dua ujung usia: memastikan masa depan cerah bagi balita dan masa tua yang bermartabat bagi lansia.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {fokusProgram.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 flex items-start gap-6 transition-all duration-300">
              <div className="w-14 h-14 shrink-0 bg-[#0a1680]/5 rounded-2xl flex items-center justify-center text-[#0a1680]">
                <item.icon className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}