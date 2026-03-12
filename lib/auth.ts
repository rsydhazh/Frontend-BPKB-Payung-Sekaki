import { apiFetch } from "./api";

export async function login(email: string, password: string) {
  const res = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  localStorage.setItem("token", res.token);

  return res;
}