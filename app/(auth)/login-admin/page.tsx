"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  
  // 1. Membuat referensi (ref) untuk elemen input password
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan Password Harus Diisi");
      return; 
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://api-payung-sekaki.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/admin");
      } else {
        setError("Login gagal! Periksa kembali email dan password");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fungsi untuk menangkap tombol Enter di kolom Email
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah form langsung tersubmit
      passwordInputRef.current?.focus(); // Memindahkan kursor ke kolom password
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfdff] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[#0a1680] mb-8 hover:text-[#f1b94c] transition-colors font-medium"
        >
          <FiArrowLeft size={18} />
          Kembali ke Portal Publik
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">
            Login Admin
          </h1>
          <p className="text-sm text-gray-500">
            Silakan masuk untuk mengelola konten portal.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailKeyDown} // <-- 3. Memasang deteksi tombol Enter
              placeholder="admin@payungsekaki.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#93b2f8] transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordInputRef} // <-- 4. Menempelkan referensi ke input ini
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#93b2f8] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a1680]"
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
              isLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-[#0a1680] hover:bg-[#f1b94c] shadow-lg hover:shadow-[#f1b94c]/20"
            }`}
          >
            {isLoading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <footer className="mt-12 text-center text-xs text-gray-400">
          &copy; 2026 Portal Payung Sekaki. Hak Cipta Dilindungi.
        </footer>
      </div>
    </div>
  );
}