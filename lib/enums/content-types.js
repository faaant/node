const processedContentTypes = {
  'text/html': (req) => req.text(),
  'text/plain': (req) => req.text(),
  'application/json': async (req) => {
    try {
      return await req.json()
    } catch {
      return {}
    }
  },
  'application/x-www-form-urlencoded': async (req) => {
    return Object.fromEntries(new URLSearchParams(await req.formData()))
  },
}

export default processedContentTypes
