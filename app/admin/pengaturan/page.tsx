"use client";

import { useEffect, useState, useCallback } from "react";
import { getSettings, updateSettings } from "@/services/settingService";
import { Settings, Posyandu } from "@/types/settings"; 
import Image from 'next/image'
import { FiSettings, FiSave, FiCheckCircle, FiTarget, FiUsers, FiImage, FiX, FiBookOpen, FiPlus, FiTrash2 } from "react-icons/fi";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Settings>({ daftar_posyandu: [] });
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // State untuk form tambah Posyandu
  const [newPosyandu, setNewPosyandu] = useState<Posyandu>({
    id: 0, nama: "", lokasi: "", jadwal: "", kader: ""
  });

  const loadData = useCallback(async () => {
    try {
      const data = await getSettings();
      setSettings({ ...data, daftar_posyandu: data?.daftar_posyandu || [] });
    } catch (error) {
      console.error("Gagal memuat pengaturan", error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // FUNGSI CRUD POSYANDU LOKAL 
  const handleAddPosyandu = () => {
    if (!newPosyandu.nama || !newPosyandu.lokasi) return;
    
    const posyanduBaru = { ...newPosyandu, id: Date.now() }; 
    setSettings(prev => ({
      ...prev,
      daftar_posyandu: [...(prev.daftar_posyandu || []), posyanduBaru]
    }));
    
    setNewPosyandu({ id: 0, nama: "", lokasi: "", jadwal: "", kader: "" });
  };

  const handleRemovePosyandu = (idToRemove: number) => {
    setSettings(prev => ({
      ...prev,
      daftar_posyandu: prev.daftar_posyandu?.filter(p => p.id !== idToRemove) || []
    }));
  };

  async function handleSave() {
    setIsSaving(true);
    try {
      await updateSettings(settings);
      setToastMsg("Pengaturan & Daftar Posyandu berhasil disimpan!");
      setTimeout(() => setToastMsg(""), 3000);
      loadData(); 
    } catch (error) {
      console.error("Gagal menyimpan", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-8 relative">
      {/* Toast Notifikasi */}
      {toastMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-50 text-green-700 px-6 py-3 rounded-xl shadow-lg border border-green-200 flex items-center gap-3 z-50 animate-fade-in-down">
          <FiCheckCircle size={20} />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2 flex items-center gap-3">
          <FiSettings className="text-[#0a1680]" /> Pengaturan Portal
        </h1>
        <p className="text-gray-500 font-medium">Kelola sejarah, visi misi, struktur organisasi, dan daftar posyandu.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* SEJARAH SINGKAT (Fokus, tanpa Nama Balai & Alamat) */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <FiBookOpen className="text-[#f1b94c]" /> Sejarah Singkat
          </h2>
          <div>
            <textarea
              value={settings.sejarah || ""}
              onChange={(e) => setSettings({ ...settings, sejarah: e.target.value })}
              rows={6}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a1680] bg-gray-50 focus:bg-white transition-all"
              placeholder="Tuliskan sejarah berdirinya Balai KB Payung Sekaki..."
            />
          </div>
        </div>

        {/* VISI & MISI */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <FiTarget className="text-[#f1b94c]" /> Visi & Misi
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Visi Instansi</label>
              <textarea
                value={settings.visi || ""}
                onChange={(e) => setSettings({ ...settings, visi: e.target.value })}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a1680] bg-gray-50 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Misi Instansi</label>
              <textarea
                value={settings.misi || ""}
                onChange={(e) => setSettings({ ...settings, misi: e.target.value })}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0a1680] bg-gray-50 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* DAFTAR POSYANDU (CRUD) */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2"><FiUsers className="text-[#f1b94c]" /> Kelola Daftar Posyandu</div>
          </h2>
          
          {/* Form Tambah Posyandu */}
          <div className="bg-gray-50 p-5 rounded-2xl mb-6 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Tambah Posyandu Baru</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <input type="text" placeholder="Nama Posyandu" value={newPosyandu.nama} onChange={e => setNewPosyandu({...newPosyandu, nama: e.target.value})} className="border rounded-lg px-3 py-2 text-sm" />
              <input type="text" placeholder="Lokasi / RW" value={newPosyandu.lokasi} onChange={e => setNewPosyandu({...newPosyandu, lokasi: e.target.value})} className="border rounded-lg px-3 py-2 text-sm" />
              <input type="text" placeholder="Jadwal (cth: Minggu ke-1)" value={newPosyandu.jadwal} onChange={e => setNewPosyandu({...newPosyandu, jadwal: e.target.value})} className="border rounded-lg px-3 py-2 text-sm" />
              <input type="text" placeholder="Nama Kader" value={newPosyandu.kader} onChange={e => setNewPosyandu({...newPosyandu, kader: e.target.value})} className="border rounded-lg px-3 py-2 text-sm" />
            </div>
            <button onClick={handleAddPosyandu} className="flex items-center gap-2 bg-[#0a1680] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#f1b94c] transition-colors">
              <FiPlus /> Tambahkan ke Tabel
            </button>
          </div>

          {/* Tabel Posyandu */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-bold">Nama Posyandu</th>
                  <th className="px-4 py-3 font-bold">Lokasi</th>
                  <th className="px-4 py-3 font-bold">Jadwal</th>
                  <th className="px-4 py-3 font-bold">Kader</th>
                  <th className="px-4 py-3 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(!settings.daftar_posyandu || settings.daftar_posyandu.length === 0) ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Belum ada data posyandu</td></tr>
                ) : (
                  settings.daftar_posyandu.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold">{item.nama}</td>
                      <td className="px-4 py-3 text-gray-600">{item.lokasi}</td>
                      <td className="px-4 py-3 text-gray-600">{item.jadwal}</td>
                      <td className="px-4 py-3 text-gray-600">{item.kader}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => handleRemovePosyandu(item.id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Struktur Organisasi */}
        <div className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <FiImage className="text-[#f1b94c]" /> Bagan Organisasi
            </h2>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl relative bg-gray-50/50">
              {settings.struktur_organisasi ? (
                <div className="relative inline-block w-full">
                  <Image src={settings.struktur_organisasi} alt="Preview" width={600} height={400} className="mx-auto max-h-64 object-contain rounded-lg" />
                  <button onClick={() => setSettings({ ...settings, struktur_organisasi: "" })} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2"><FiX /></button>
                </div>
              ) : (
                <div className="text-center">
                  <FiImage className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <label className="cursor-pointer bg-white px-4 py-2 rounded-md font-bold text-[#0a1680] border shadow-sm">
                    Pilih File Bagan
                    <input type="file" className="sr-only" accept="image/*" onChange={(e) => {
                      if (e.target.files?.[0]) setSettings({ ...settings, struktur_organisasi: URL.createObjectURL(e.target.files[0]) });
                    }} />
                  </label>
                </div>
              )}
            </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-4 mb-10">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg transform hover:-translate-y-1 ${
              isSaving ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#0a1680] hover:bg-[#f1b94c] text-white hover:text-[#0a1680]"
            }`}
          >
            <FiSave size={20} /> {isSaving ? "Menyimpan..." : "Simpan Semua Perubahan"}
          </button>
        </div>

      </div>
    </div>
  );
}