export async function login(email: string, password: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const body = await res.json();
  console.log("Respuesta login:", res.status, body);

  if (!res.ok) {
    throw new Error(body.error || "Error en el login");
  }

  return body;
}

export async function logout() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const body = await res.json();
  console.log("Respuesta logout:", res.status, body);

  if (!res.ok) {
    throw new Error(body.error || "Error en el logout");
  }

  return body;
}
