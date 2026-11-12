export async function getMessage(message, companyId) {

  // PPRODUCTION
  const res = await fetch("https://server.verafied.tech/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      message,
      companyId
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Unknown error");
  }

  return res.json();
}

