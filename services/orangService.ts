import { apiFetch } from "@/lib/api";
import { OrangPayload } from "@/types/orang";

export async function createOrang(data: OrangPayload) {
  return apiFetch("/orang", {
    method: "POST",
    body: JSON.stringify(data),
  });
}