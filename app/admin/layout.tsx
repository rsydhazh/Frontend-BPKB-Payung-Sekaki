"use client";

import Sidebar from "@/components/admin/Sidebar";
import { FiBell, FiUser } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="flex min-h-screen bg-[#fcfdff] font-sans">
      {/* Sidebar Kiri */}
      <Sidebar />

      {/* Area Konten Kanan */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Topbar Premium */}
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-10 shadow-sm z-10 shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1a1a1a]">Manajemen Konten</h2>
            <p className="text-sm text-gray-500 font-medium">{today}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-[#0a1680] transition-colors">
              <FiBell className="text-2xl" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#0a1680]/10 flex items-center justify-center text-[#0a1680] group-hover:bg-[#0a1680] group-hover:text-white transition-colors">
                <FiUser className="text-xl" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-[#1a1a1a]">Admin Balai</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Area Konten Dinamis yang bisa di-scroll */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fcfdff] p-10">
          {children}
        </main>
      </div>
    </div>
  );
}