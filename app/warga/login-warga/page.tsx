"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import Link from "next/link"; // Mengimpor Link untuk navigasi antar rute

export default function LoginWargaPage() {
  const router = useRouter();
  
  // Mengembalikan konfigurasi yang aman menggunakan variabel lingkungan dari .env.local
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        console.log("Login Berhasil, Token disimpan otomatis!", data.user);
        router.push("/warga/history");
      }
    } catch (error: any) {
      setErrorMsg("Terjadi kesalahan koneksi server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Portal Kesehatan Warga
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Masuk untuk melihat riwayat pemeriksaan kesehatan Anda
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5 border border-red-100">
                <AlertCircle size={18} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1680]/30 focus:border-[#0a1680] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center gap-2 px-4 py-3 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#0a1680] hover:bg-[#f1b94c] hover:shadow-[#f1b94c]/30 focus:outline-none transition-all transform active:scale-95 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
              >
                <LogIn size={18} />
                {isLoading ? "Memproses..." : "Masuk ke Portal"}
              </button>
            </div>
          </form>

          {/* Bagian Tautan Pendaftaran Mandiri Warga */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Belum punya akun portal?{" "}
            <Link href="/warga/register" className="font-bold text-[#0a1680] hover:text-[#f1b94c] transition-colors">
              Daftar Mandiri di Sini
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}