import router from '../lib/Router'

export async function onRequest(context) {
  const { request } = context
  return router.handle(request, new Response())
}
