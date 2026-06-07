"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserPlus, Mail, Lock, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterWargaPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validasi kecocokan password tingkat awal
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      setLoading(false);
      return;
    }

    try {
      // Fungsi ajaib Supabase untuk mendaftarkan user baru secara otomatis
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Jika ingin menyimpan data tambahan seperti Nama/NIK, bisa dimasukkan ke metadata
          data: {
            role: "warga",
          }
        }
      });

      if (signUpError) throw signUpError;

      setSuccess(true);
      // Tunggu 3 detik lalu arahkan ke halaman login warga
      setTimeout(() => {
        router.push("/warga/login-warga");
      }, 3000);

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdff] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto w-full max-w-md">
        <Link href="/warga/login-warga" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a1680] hover:text-[#f1b94c] transition-colors mb-6 px-4 sm:px-0">
          <ArrowLeft size={16} /> Kembali ke Login
        </Link>
        <h2 className="text-center text-3xl font-black text-[#1a1a1a] tracking-tight">
          Pendaftaran <span className="text-[#0a1680]">Warga Baru</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Buat akun portal kesehatanmu secara mandiri dan instan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_20px_50px_rgba(10,22,128,0.06)] border border-blue-50/50 sm:rounded-3xl sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 flex items-start gap-3 text-sm">
              <AlertCircle className="shrink-0 mt-0.5" size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 flex items-start gap-3 text-sm">
              <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-bold">Pendaftaran Berhasil!</p>
                <p className="text-xs text-green-600/90 mt-0.5">Akun Anda sukses dibuat. Mengalihkan ke halaman login...</p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0a1680]/20 focus:border-[#0a1680] text-sm transition-all"
                  placeholder="nama@email.com"
                  disabled={loading || success}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0a1680]/20 focus:border-[#0a1680] text-sm transition-all"
                  placeholder="••••••••"
                  disabled={loading || success}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0a1680]/20 focus:border-[#0a1680] text-sm transition-all"
                  placeholder="••••••••"
                  disabled={loading || success}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex justify-center items-center gap-2 bg-[#0a1680] text-white py-3.5 px-4 rounded-2xl font-bold text-sm hover:bg-opacity-95 shadow-lg shadow-[#0a1680]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a1680] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Mendaftarkan..." : "Daftar Akun Sekarang"}
                {!loading && <UserPlus size={16} />}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link href="/warga/login-warga" className="font-bold text-[#0a1680] hover:text-[#f1b94c] transition-colors">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}