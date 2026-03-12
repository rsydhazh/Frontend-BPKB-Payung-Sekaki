import { apiFetch } from "@/lib/api";
import { Page, PagePayload } from "@/types/page";

export async function getPage(slug: string): Promise<Page> {
  return apiFetch(`/pages/${slug}`);
}

export async function createPage(data: PagePayload) {
  return apiFetch("/pages", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePage(id: number, data: PagePayload) {
  return apiFetch(`/pages/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}