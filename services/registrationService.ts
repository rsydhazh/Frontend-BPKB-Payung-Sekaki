import { apiFetch } from "@/lib/api";
import { Registration, RegistrationPayload } from "@/types/registration";

// GET: Mengambil semua data pendaftar (Untuk Admin)
export async function getRegistrations(): Promise<Registration[]> {
  return apiFetch("/registrations", {
    cache: "no-store", // Memastikan Admin selalu melihat pendaftar terbaru tanpa cache
  });
}

// POST: Mengirim formulir pendaftaran baru (Untuk Warga)
export async function createRegistration(data: RegistrationPayload) {
  return apiFetch("/registrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// DELETE: Menghapus data pendaftar (Untuk Admin)
export async function deleteRegistration(id: number | string) {
  return apiFetch(`/registrations/${id}`, {
    method: "DELETE",
  });
}