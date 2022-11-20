async function safeJSON(req, fallback) {
  try {
    return await req.json()
  } catch {
    return fallback
  }
}

async function safeURLencoded(req, fallback) {
  try {
    return Object.fromEntries(new URLSearchParams(await req.formData()))
  } catch {
    return fallback
  }
}

export { safeJSON, safeURLencoded }
