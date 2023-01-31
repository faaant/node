function json(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const helpers = { json }
export default helpers
