import router from '../lib/Router'

export async function onRequest(context) {
  const { request } = context
  try {
    return router.handle(request, new Response())
  } catch (err) {
    return new Response(
      process.env.NODE_ENV === 'production' ? 'Internal error' : err,
      {
        status: 500,
        statusText: 'Internal server error',
      }
    )
  }
}
