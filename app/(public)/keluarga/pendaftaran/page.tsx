"use client";

import { useState } from "react";
import { FiSend, FiCheckCircle, FiInfo, FiEdit3, FiUser, FiCreditCard, FiCalendar, FiMapPin, FiRefreshCw, FiPhone, FiAlertCircle } from "react-icons/fi";
import { createRegistration } from "@/services/registrationService";
import { RegistrationPayload } from "@/types/registration"; 

export default function PendaftaranKeluargaPage() {
  const [formData, setFormData] = useState<RegistrationPayload>({
    program_id: "KELUARGA-KB-01", 
    full_name: "",
    nik: "",
    phone_number: "", // Disisipkan agar tim balai bisa menghubungi
    address: "",
    tanggal_lahir: "",
    faskes: "",
    status_peserta: "",
    jenis_kb: "",
    tanggal_pelayanan: "",
  });


  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleReset = () => {
    setFormData({
      program_id: "KELUARGA-KB-01", 
      full_name: "",
      nik: "",
      phone_number: "",
      address: "",
      tanggal_lahir: "",
      faskes: "",
      status_peserta: "",
      jenis_kb: "",
      tanggal_pelayanan: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await createRegistration(formData as RegistrationPayload);
      setSubmitStatus({ type: "success", message: "Pendaftaran berhasil! Tim penyuluh KB akan segera memproses data Anda." });
      handleReset(); // Kosongkan form setelah sukses
    } catch {
      setSubmitStatus({ type: "error", message: "Terjadi kesalahan. Pastikan koneksi stabil dan coba lagi." });
    } finally {
      setIsLoading(false);
      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 7000);
    }
  };

  return (
    <main className="bg-[#fcfdff] min-h-screen pb-24 font-sans">
      
      {/* 1. HEADER BIRU MELENGKUNG */}
      <section className="bg-[#0a1680] text-white pt-32 pb-28 overflow-hidden rounded-b-[4rem] shadow-lg relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FiEdit3 className="text-5xl text-[#f1b94c] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Formulir Pendaftaran <span className="text-[#f1b94c]">Akseptor KB</span>
          </h1>
          <p className="text-[#93b2f8] font-medium text-lg leading-relaxed max-w-2xl mx-auto">
            Lengkapi data diri Anda di bawah ini dengan sebenar-benarnya untuk mendaftar pelayanan Keluarga Berencana.
          </p>
        </div>
      </section>

      {/* 2. KOTAK FORMULIR */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-16 relative z-20">
        
        <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_rgba(10,22,128,0.1)] border border-gray-100 p-8 lg:p-12">
          
          {/* Notifikasi Status */}
          {submitStatus.type && (
            <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {submitStatus.type === 'success' ? <FiCheckCircle size={20} className="mt-0.5 shrink-0" /> : <FiAlertCircle size={20} className="mt-0.5 shrink-0" />}
              <span className="font-bold text-sm">{submitStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiUser size={18} />
                </div>
                <input required type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} placeholder="Masukkan nama lengkap sesuai KTP" className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm" />
              </div>
            </div>

            {/* NIK & No HP */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">NIK (Nomor Induk Kependudukan) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FiCreditCard size={18} />
                  </div>
                  <input required type="text" maxLength={16} value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} placeholder="Masukkan 16 digit NIK" className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm" />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 font-medium ml-1">Masukkan 16 digit nomor NIK yang tertera pada KTP</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">No. Telepon / WhatsApp <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FiPhone size={18} />
                  </div>
                  <input required type="tel" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} placeholder="Contoh: 081234567890" className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Alamat Lengkap */}
            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Alamat Lengkap <span className="text-red-500">*</span></label>
              <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Masukkan alamat lengkap termasuk RT/RW, kelurahan, dan kecamatan..." className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all resize-none text-sm"></textarea>
            </div>

            {/* Tanggal Lahir & Faskes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Tanggal Lahir <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FiCalendar size={18} />
                  </div>
                  <input required type="date" value={formData.tanggal_lahir} onChange={(e) => setFormData({...formData, tanggal_lahir: e.target.value})} className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm text-gray-600" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Fasilitas Kesehatan / Faskes <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <FiMapPin size={18} />
                  </div>
                  <input required type="text" value={formData.faskes} onChange={(e) => setFormData({...formData, faskes: e.target.value})} placeholder="Contoh: Puskesmas Payung Sekaki" className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Status Peserta & Jenis KB */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Status Peserta KB <span className="text-red-500">*</span></label>
                <select required value={formData.status_peserta} onChange={(e) => setFormData({...formData, status_peserta: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm appearance-none cursor-pointer">
                  <option value="" disabled>Pilih Status Peserta</option>
                  <option value="Peserta Baru">Peserta Baru</option>
                  <option value="Peserta Aktif">Peserta Aktif</option>
                  <option value="Ganti Cara / Metode">Ganti Cara / Metode</option>
                  <option value="Drop Out / Putus Pakai">Drop Out / Putus Pakai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Jenis Pelayanan KB <span className="text-red-500">*</span></label>
                <select required value={formData.jenis_kb} onChange={(e) => setFormData({...formData, jenis_kb: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm appearance-none cursor-pointer">
                  <option value="" disabled>Pilih Jenis Layanan</option>
                  <option value="IUD">IUD / Spiral</option>
                  <option value="Implant">Implant / Susuk</option>
                  <option value="Suntik 1 Bulan">Suntik 1 Bulan</option>
                  <option value="Suntik 3 Bulan">Suntik 3 Bulan</option>
                  <option value="Pil KB">Pil KB</option>
                  <option value="Kondom">Kondom</option>
                  <option value="MOP (Vasektomi)">MOP (Vasektomi)</option>
                  <option value="MOW (Tubektomi)">MOW (Tubektomi)</option>
                </select>
              </div>
            </div>

            {/* Tanggal Pelayanan Diinginkan */}
            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Tanggal Pelayanan yang Diinginkan <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiCalendar size={18} />
                </div>
                <input required type="date" value={formData.tanggal_pelayanan} onChange={(e) => setFormData({...formData, tanggal_pelayanan: e.target.value})} className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] bg-gray-50 focus:bg-white transition-all text-sm text-gray-600" />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5 font-medium ml-1">Pilih tanggal yang Anda inginkan untuk menerima pelayanan</p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button type="submit" disabled={isLoading} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all shadow-lg transform active:scale-95 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30'}`}>
                <FiSend size={18} /> {isLoading ? "Mengirim Pendaftaran..." : "Kirim Pendaftaran"}
              </button>
              
              <button type="button" onClick={handleReset} disabled={isLoading} className="flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-bold text-[#0a1680] bg-white border-2 border-[#0a1680]/20 hover:bg-gray-50 hover:border-[#0a1680] transition-all transform active:scale-95">
                <FiRefreshCw size={18} /> Reset Form
              </button>
            </div>

            {/* Box Catatan Penting */}
            <div className="mt-8 bg-[#0a1680]/5 rounded-2xl p-6 border border-[#0a1680]/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0a1680] text-white flex items-center justify-center shrink-0">
                <FiInfo size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#0a1680] mb-1">Catatan Penting</h4>
                <p className="text-sm text-[#0a1680]/80 leading-relaxed">
                  Pastikan semua data yang Anda masukkan sudah benar dan sesuai dengan identitas resmi. Setelah pendaftaran dikirim, tim kami akan menghubungi Anda melalui WhatsApp/Telepon untuk konfirmasi jadwal pelayanan di fasilitas kesehatan.
                </p>
              </div>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}