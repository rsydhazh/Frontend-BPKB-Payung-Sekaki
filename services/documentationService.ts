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

export async function updateDocumentation(id: string, formData: FormData) {
  const cleanId = String(id).trim();
  
  return apiFetch(`/documentation/${cleanId}`, {
    method: "PUT",
    body: formData, 
  });
}


export async function deleteDocumentation(id: string | number) {
  const cleanId = String(id).trim();

  return apiFetch(`/documentation/${cleanId}`, {
    method: "DELETE",
  });
}