"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navMenus } from "./nav-config";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";

interface NavbarProps {
  type: "umum" | "bina-generasi" | "keluarga";
}

export default function Navbar({ type }: NavbarProps) {
  const pathname = usePathname();
  // State untuk mendeteksi apakah menu HP sedang terbuka atau tertutup
  const [isOpen, setIsOpen] = useState(false);
  const currentMenu = navMenus[type];
  const isActive = (href: string) => {
    if (href === `/${type}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand Section */}
          <div className="shrink-0 flex items-center gap-3 z-50">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#0a1680] rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-[#f1b94c] transition-colors shadow-md">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#1a1a1a] text-lg leading-tight tracking-wide">
                  Balai Penyuluh KB
                </span>
                <span className="text-sm text-[#0a1680] font-semibold tracking-wider uppercase">
                  Payung Sekaki
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links  */}
          <div className="hidden md:flex items-center space-x-1">
            {currentMenu.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#0a1680] text-white shadow-md"
                      : "text-[#1a1a1a] hover:bg-[#93b2f8]/20 hover:text-[#0a1680]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action Button Desktop*/}
          <div className="hidden md:flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold text-[#0a1680] border-2 border-[#0a1680] px-5 py-2 rounded-xl hover:bg-[#0a1680] hover:text-white transition-all"
            >
              <FiLogOut className="rotate-180" />
              Pilih Modul
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex items-center md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0a1680] hover:text-[#f1b94c] focus:outline-none p-2 transition-colors"
            >
              {isOpen ? <FiX className="h-7 w-7" /> : <FiMenu className="h-7 w-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-2xl transition-all duration-300 origin-top ${
          isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="px-6 pt-4 pb-8 space-y-3 bg-white/95 backdrop-blur-xl">
          {currentMenu.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)} // Tutup menu saat link diklik
                className={`block px-5 py-3.5 rounded-xl text-base font-bold transition-all ${
                  active
                    ? "bg-[#0a1680] text-white shadow-md"
                    : "text-[#1a1a1a] hover:bg-[#93b2f8]/20 hover:text-[#0a1680]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Action Button Mobile */}
          <div className="pt-6 mt-4 border-t border-gray-100">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 text-base font-bold text-[#0a1680] border-2 border-[#0a1680] w-full py-3.5 rounded-xl hover:bg-[#0a1680] hover:text-white transition-all"
            >
              <FiLogOut className="rotate-180" />
              Kembali Pilih Modul
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}