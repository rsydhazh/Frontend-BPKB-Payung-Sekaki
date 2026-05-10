import { apiFetch } from "@/lib/api";
import { Documentation } from "@/types/documentation";

export async function getDocumentation(): Promise<Documentation[]> {
  return apiFetch("/documentation");
}


export async function createDocumentation(formData: FormData) {
  return apiFetch("/documentation", {
    method: "POST",
    body: formData, 
  });
}