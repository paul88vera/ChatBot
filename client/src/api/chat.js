export async function getMessage(message, companyId, token) {

  const res = await fetch("http://localhost:5400/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" ,
    Authorization: `Bearer ${token}`,},
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

