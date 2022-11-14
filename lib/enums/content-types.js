const processedContentTypes = {
  'text/html': (text) => text,
  'text/plain': (text) => text,
  'application/json': (json) => {
    try {
      return JSON.parse(json)
    } catch {
      return {}
    }
  },
  'application/x-www-form-urlencoded': (data) => {
    return Object.fromEntries(new URLSearchParams(data))
  },
}

export default processedContentTypes
