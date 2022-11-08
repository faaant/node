export async function onRequest(context) {
  const { request } = context
  return new Response(JSON.stringify(request, null, '\t'))
}
