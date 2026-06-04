import { apiFetch } from "@/lib/api";
import { News } from "@/types/news";

export async function getNews(): Promise<News[]> {
  return apiFetch("/news");
}

export async function createNews(formData: FormData) {
  // Karena ini FormData, kita gak usah pakai JSON.stringify
  return apiFetch("/news", {
    method: "POST",
    body: formData, 
  });
}

export async function updateNews(id: number | string, formData: FormData) {
  // Menembak sesuai format rute backend: PUT /news/:id
  return apiFetch(`/news/${id}`, {
    method: "PUT",
    body: formData,
  });
}
// --- JALUR BARU UNTUK MENGHAPUS BERITA ---
export async function deleteNews(id: number | string) {
  return apiFetch(`/news/${id}`, {
    method: "DELETE",
  });
}