async function uploadAvatar(file) {
  const form = new FormData();
  form.append("avatar", file);

  const res = await fetch(`/api/upload/company-avatar/${company.publicId}`, {
    method: "POST",
    body: form,
  });

  return res.json();
}

export { uploadAvatar };