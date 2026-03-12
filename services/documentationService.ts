import { apiFetch } from "@/lib/api";
import { Documentation, DocumentationPayload } from "@/types/documentation";

export async function getDocumentation(): Promise<Documentation[]> {
  return apiFetch("/documentation");
}

export async function createDocumentation(data: DocumentationPayload) {
  return apiFetch("/documentation", {
    method: "POST",
    body: JSON.stringify(data),
  });
}