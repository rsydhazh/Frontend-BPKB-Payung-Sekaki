import { apiFetch } from "@/lib/api";
import { Settings } from "@/types/settings";

export async function getSettings(): Promise<Settings> {
  return apiFetch("/settings", {
    cache: "no-store", 
  });
}

export async function updateSettings(data: Settings) {
  return apiFetch("/settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Memastikan backend menerima data sebagai format JSON
    },
    body: JSON.stringify(data),
  });
}