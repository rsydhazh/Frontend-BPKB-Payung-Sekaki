import { FiArrowRight, FiUsers, FiHeart, FiActivity, FiStar, FiTarget } from "react-icons/fi";

export default function UmumProgramPage() {
  const programs = [
    { 
      id: 1, 
      title: "Program Kependudukan", 
      desc: "Program khusus untuk meningkatkan kesadaran masyarakat mengenai pentingnya pengelolaan kependudukan yang berkelanjutan dan terdata.",
      icon: <FiUsers size={28} />
    },
    { 
      id: 2, 
      title: "Keluarga Berencana (KB)", 
      desc: "Pelayanan, penyuluhan, dan edukasi guna mengontrol angka kelahiran dan meningkatkan kesejahteraan keluarga secara menyeluruh.",
      icon: <FiHeart size={28} />
    },
    { 
      id: 3, 
      title: "Kesejahteraan Keluarga", 
      desc: "Pemberdayaan ekonomi dan sosial melalui kelompok kegiatan ketahanan keluarga seperti Bina Keluarga Balita (BKB), Remaja (BKR), dan Lansia (BKL).",
      icon: <FiActivity size={28} />
    },
    { 
      id: 4, 
      title: "Quick Win", 
      desc: "Program percepatan dan inovasi strategis unggulan Balai KB Payung Sekaki dalam menangani isu prioritas, seperti percepatan penurunan angka stunting.",
      icon: <FiStar size={28} />
    }
  ];

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* 1. HERO SECTION*/}
      <section className="bg-[#0a1680] pt-14 pb-24 text-center px-8 rounded-b-[4rem] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <FiTarget className="mx-auto text-[#f1b94c] mb-6" size={40} />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Program <span className="text-[#f1b94c]">Unggulan</span>
          </h1>
          <p className="text-[#93b2f8] text-lg font-medium leading-relaxed">
            Jelajahi berbagai program utama Balai KB Payung Sekaki yang dirancang khusus untuk mewujudkan kesejahteraan dan ketahanan masyarakat.
          </p>
        </div>
      </section>

      {/* 2. GRID KARTU PROGRAM */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((prog) => (
            <div key={prog.id} className="bg-white p-10 rounded-4xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(10,22,128,0.08)] hover:-translate-y-2 transition-all duration-300 group flex flex-col">
              
              <div className="w-14 h-14 bg-[#f1b94c]/20 text-[#d99c2b] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0a1680] group-hover:text-white transition-colors">
                {prog.icon}
              </div>
              
              <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-4">{prog.title}</h2>
              <p className="text-gray-500 leading-relaxed mb-8 flex-1">{prog.desc}</p>
              
              <button className="flex items-center gap-2 text-[#f1b94c] font-bold text-sm uppercase tracking-wider group-hover:text-[#0a1680] transition-colors mt-auto">
                Detail Program <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}