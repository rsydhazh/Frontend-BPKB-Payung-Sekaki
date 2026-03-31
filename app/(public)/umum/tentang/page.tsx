export const dynamic = "force-dynamic";
export const revalidate = 0;

import { FiMapPin, FiCalendar, FiUsers, FiInfo, FiBookOpen, FiTarget, FiImage } from "react-icons/fi";
import { Settings } from "@/types/settings"; 
import { getSettings } from "@/services/settingService"; 

export default async function UmumTentangPage() {
  // 1. Tarik Data Nyata dari Backend
  let settings = {} as Settings;
  try {
    settings = await getSettings() || {};
  } catch (error) {
    console.error("Gagal menarik data pengaturan", error);
  }

  // 2. Ambil kantong posyandu dari dalam settings
  const posyanduList = settings.daftar_posyandu || [];

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans pt-8">
      
      {/* 1. HEADER*/}
      <section className="pt-6 pb-32 px-8 text-center max-w-3xl mx-auto relative">
        <div className="w-16 h-16 bg-[#0a1680]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FiInfo className="text-3xl text-[#0a1680]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight">
          Tentang <span className="text-[#0a1680]">Balai Penyuluh KB Payung Sekaki</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Profil, sejarah, visi misi, struktur organisasi, dan daftar layanan posyandu di wilayah binaan Balai KB Payung Sekaki.
        </p>
      </section>

      {/* 2. PROFIL (Sejarah, Visi, Misi, Struktur Organisasi) */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 mb-20 space-y-8">
        
        {/* Card Sejarah */}
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100">
          <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-6 flex items-center gap-3">
            <FiBookOpen className="text-[#f1b94c]" /> Sejarah
          </h3>
          {settings.sejarah ? (
            <p className="text-gray-500 leading-relaxed whitespace-pre-line">{settings.sejarah}</p>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50/50">
              <p className="text-gray-400 font-medium italic">Informasi sejarah belum ditambahkan oleh Admin.</p>
            </div>
          )}
        </div>

        {/* Card Visi & Misi */}
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-6 flex items-center gap-3">
              <FiTarget className="text-[#f1b94c]" /> Visi
            </h3>
            {settings.visi ? (
              <p className="text-gray-500 leading-relaxed whitespace-pre-line">{settings.visi}</p>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50/50 h-full flex items-center justify-center">
                <p className="text-gray-400 font-medium italic">Visi belum ditambahkan oleh Admin.</p>
              </div>
            )}
          </div>
          <div className="w-px bg-gray-100 hidden md:block"></div>
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-6 flex items-center gap-3">
              <FiTarget className="text-[#0a1680]" /> Misi
            </h3>
            {settings.misi ? (
              <p className="text-gray-500 leading-relaxed whitespace-pre-line">{settings.misi}</p>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50/50 h-full flex items-center justify-center">
                <p className="text-gray-400 font-medium italic">Misi belum ditambahkan oleh Admin.</p>
              </div>
            )}
          </div>
        </div>

        {/* Card Struktur Organisasi */}
        <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100">
          <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-6 flex items-center gap-3">
            <FiUsers className="text-[#f1b94c]" /> Struktur Organisasi
          </h3>
          {settings.struktur_organisasi ? (
            <div className="w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={settings.struktur_organisasi} alt="Struktur Organisasi" className="w-full h-auto object-contain" />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center bg-gray-50/50 flex flex-col items-center">
              <FiImage className="text-gray-300 mb-4" size={48} />
              <p className="text-gray-400 font-medium italic">Bagan Struktur Organisasi belum diunggah oleh Admin.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. TABEL DAFTAR POSYANDU */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col mb-8">
          <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-2 flex items-center gap-3">
            Daftar Posyandu <div className="h-1 w-12 bg-[#f1b94c] rounded-full"></div>
          </h2>
          <p className="text-gray-500 font-medium">Informasi lokasi dan jadwal rutin pelayanan Posyandu di wilayah binaan kami.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="bg-[#0a1680] text-white">
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Nama Posyandu</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Lokasi / RW</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Jadwal Rutin</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Koordinator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posyanduList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-16 text-center text-gray-400 font-medium italic border-b border-gray-100 bg-gray-50/30">
                      Data Posyandu belum ditambahkan oleh Admin.
                    </td>
                  </tr>
                ) : (
                  posyanduList.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-8 py-5 text-sm font-bold text-[#1a1a1a] group-hover:text-[#0a1680] transition-colors">
                        {item.nama}
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-[#f1b94c]" /> {item.lokasi}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-[#0a1680]" /> {item.jadwal}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiUsers className="text-gray-400" /> {item.kader}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>
  );
}