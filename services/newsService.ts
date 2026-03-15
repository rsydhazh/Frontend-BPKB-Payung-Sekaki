import { apiFetch } from "@/lib/api";
import { News, NewsPayload } from "@/types/news";

export async function getNews(): Promise<News[]> {
  return apiFetch("/news");
}

export async function createNews(data: NewsPayload) {
  return apiFetch("/news", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// --- JALUR BARU UNTUK MENGHAPUS BERITA ---
export async function deleteNews(id: number | string) {
  return apiFetch(`/news/${id}`, {
    method: "DELETE",
  });
}