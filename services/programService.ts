import { apiFetch } from "@/lib/api";
import { Program, ProgramPayload } from "@/types/program";

export async function getPrograms(): Promise<Program[]> {
  return apiFetch("/programs");
}

export async function createProgram(data: ProgramPayload) {
  return apiFetch("/programs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}