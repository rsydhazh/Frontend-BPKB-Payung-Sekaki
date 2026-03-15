"use client";

import { useState } from "react";
import { FiSend, FiCheckCircle, FiInfo, FiEdit3 } from "react-icons/fi";
import { createRegistration } from "@/services/registrationService";
import { RegistrationPayload } from "@/types/registration";

export default function PendaftaranKeluargaPage() {
  const [formData, setFormData] = useState<RegistrationPayload>({
    program_id: "KELUARGA-KB-01", 
    full_name: "",
    nik: "",
    address: "",
    phone_number: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await createRegistration(formData);
      setSubmitStatus({ type: "success", message: "Pendaftaran berhasil! Tim penyuluh KB akan segera memproses data Anda." });
      setFormData({ program_id: "KELUARGA-KB-01", full_name: "", nik: "", address: "", phone_number: "" });
    } catch {
      setSubmitStatus({ type: "error", message: "Terjadi kesalahan. Pastikan koneksi stabil dan coba lagi." });
    } finally {
      setIsLoading(false);
      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
    }
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* 1. HEADER BIRU MELENGKUNG */}
      <section className="bg-[#0a1680] text-white pt-14 pb-28 overflow-hidden rounded-b-[4rem] shadow-lg relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FiEdit3 className="text-5xl text-[#f1b94c] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Pendaftaran <span className="text-[#f1b94c]">Layanan KB</span>
          </h1>
          <p className="text-[#93b2f8] font-medium text-lg leading-relaxed">
            Formulir pendaftaran layanan Keluarga Berencana dan pembinaan kesejahteraan keluarga.
          </p>
        </div>
      </section>

      {/* 2. KOTAK FORMULIR */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-16 relative z-20">
        
        <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(10,22,128,0.1)] border border-gray-100 p-8 lg:p-12">
          
          {/* Notifikasi Status */}
          {submitStatus.type && (
            <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {submitStatus.type === 'success' ? <FiCheckCircle size={20} className="mt-0.5" /> : <FiInfo size={20} className="mt-0.5" />}
              <span className="font-bold text-sm">{submitStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap *</label>
                <input required type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} placeholder="Sesuai KTP" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#0a1680] bg-gray-50 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Induk Kependudukan (NIK) *</label>
                <input required type="text" maxLength={16} value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} placeholder="16 Digit NIK" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#0a1680] bg-gray-50 focus:bg-white transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nomor Telepon / WhatsApp *</label>
              <input required type="tel" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} placeholder="Contoh: 081234567890" className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#0a1680] bg-gray-50 focus:bg-white transition-all" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Lengkap *</label>
              <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Tuliskan alamat domisili saat ini..." className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#0a1680] bg-gray-50 focus:bg-white transition-all resize-none"></textarea>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isLoading} className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all shadow-lg transform active:scale-95 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30'}`}>
                <FiSend size={18} /> {isLoading ? "Mengirim Data..." : "Kirim Pendaftaran Layanan KB"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}