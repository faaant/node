async function safeJSON(req, fallback) {
  try {
    return await req.json()
  } catch {
    return fallback
  }
}

async function safeURLencoded(req, fallback) {
  try {
    const data = Object.fromEntries(new URLSearchParams(await req.formData()))
    console.log(data)
    return data
  } catch {
    return fallback
  }
}

export { safeJSON, safeURLencoded }
