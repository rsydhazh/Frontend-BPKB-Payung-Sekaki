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