export async function getMessage(message) {
  const res = await fetch("http://localhost:5400/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return res.json();
}
