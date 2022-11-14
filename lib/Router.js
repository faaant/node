import { METHODS } from './enums/http-methods'

class Router {
  constructor() {
    this.handlers = {}
  }

  add(method, path, ...fns) {
    if (!this.handlers[path]?.[method]) {
      this.handlers[path] = {
        ...(this.handlers[path] || {}),
        [method]: [...fns],
      }
      return
    }
    this.handlers[path][method].push(...fns)
  }

  async handle(request, response) {
    const { url, method } = request
    const path = new URL(url || '/', `http://${request.headers.host}`).pathname
    if (!this.handlers[path]?.[method]) {
      return new Response('NOT FOUND', {
        status: 404,
        statusText: 'NOT FOUND',
      })
    }

    let body = {}
    for (const handler of this.handlers[path][method]) {
      const res = await handler(request, response)
      const resBody = await res.json()
      body = {
        ...body,
        ...resBody,
      }
    }
    return new Response(JSON.stringify(body, null, '\t'), {
      status: 200,
      statusText: 'OK',
    })
  }

  get(path, ...fns) {
    this.add(METHODS.GET, path, ...fns)
  }

  post(path, ...fns) {
    this.add(METHODS.POST, path, ...fns)
  }

  put(path, ...fns) {
    this.add(METHODS.PUT, path, ...fns)
  }

  delete(path, ...fns) {
    this.add(METHODS.DELETE, path, ...fns)
  }
}

const router = new Router()

router.get(
  '/hello',
  (request, response) => {
    return new Response(
      JSON.stringify({ message1: '1)Hello world(GET)', body: request.body })
    )
  },
  (request, response) => {
    return new Response(
      JSON.stringify({ message2: '2)Hello world(GET)', body: request.body })
    )
  }
)

router.post('/hello', (request, response) => {
  return new Response(JSON.stringify({ message: 'Hello world(POST)' }))
})

export default router
