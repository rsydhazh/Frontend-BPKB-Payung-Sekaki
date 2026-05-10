const BASE_URL = "https://api-payung-sekaki.vercel.app";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // 1. Mengambil token dengan aman (hanya berjalan di sisi Client)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 2. Persiapan Headers yang Cerdas (Smart Headers)
  const headers = new Headers(options.headers || {});

  // Menyuntikkan token otomatis jika admin sudah login
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Otomatis menggunakan JSON
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  try {
    // 3. Eksekusi pemanggilan API
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 4. Fitur Auto-Logout (Penanganan Token Kedaluwarsa)
    if (res.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // Memaksa admin kembali ke halaman login baru yang sudah kita buat
        window.location.href = "/login-admin"; 
      }
      throw new Error("Sesi Anda telah habis. Silakan login kembali.");
    }

    // Mengurai respons dari backend dengan aman
    const data = await res.json().catch(() => null);

    // 5. Fitur Penanganan Error Spesifik
    if (!res.ok) {
      // Mengambil pesan error asli dari backend (misal: "Email salah"), 
      // jika tidak ada, tampilkan status HTTP bawaan.
      const errorMessage = data?.pesan || data?.message || `Terjadi kesalahan sistem (${res.status})`;
      throw new Error(errorMessage);
    }

    return data;
    
  } catch (error) { // <-- PERUBAHAN DI SINI (Tanpa ': any')
    // Mencatat error di console dengan aman untuk mempermudah Ndoro saat debugging
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui";
    console.error(`[API Gatekeeper] Gagal memanggil ${endpoint}:`, errorMessage);
    
    throw error;
  }
}