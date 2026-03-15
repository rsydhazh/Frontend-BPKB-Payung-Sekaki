"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiFileText, FiImage, FiSettings, FiLogOut, FiBox, FiUsers } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", icon: FiHome, path: "/admin" },
  { name: "Berita", icon: FiFileText, path: "/admin/berita" },
  { name: "Program", icon: FiBox, path: "/admin/program" },
  { name: "Data Pendaftar", icon: FiUsers, path: "/admin/pendaftar" }, // <-- Menu Baru!
  { name: "Galeri", icon: FiImage, path: "/admin/galeri" }, // <-- Berubah jadi Galeri (pastikan nama folder admin-nya juga diubah ya Ndoro)
  { name: "Pengaturan", icon: FiSettings, path: "/admin/pengaturan" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      router.push("/login-admin");
    }
  };

  return (
    <aside className="w-72 bg-[#0a1680] text-white min-h-screen flex flex-col shadow-2xl z-20">
      {/* Brand / Logo Area */}
      <div className="h-24 flex items-center gap-4 px-8 border-b border-white/10 shrink-0">
        <div className="w-10 h-10 bg-[#f1b94c] rounded-xl flex items-center justify-center text-[#0a1680] font-black text-xl shadow-lg">
          P
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-lg tracking-wide">Admin</span>
          <span className="text-xs text-[#93b2f8] font-medium tracking-wider uppercase">BPKB Payung Sekaki</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = item.path === "/admin" 
            ? pathname === "/admin" 
            : pathname === item.path || pathname.startsWith(`${item.path}/`);

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 group ${
                isActive
                  ? "bg-white text-[#0a1680] shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className={`text-xl transition-colors shrink-0 ${isActive ? "text-[#f1b94c]" : "group-hover:text-[#f1b94c]"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Logout Area */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl font-medium text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 group"
        >
          <FiLogOut className="text-xl shrink-0 group-hover:scale-110 transition-transform" />
          Keluar
        </button>
      </div>
    </aside>
  );
}