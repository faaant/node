import { METHODS } from './enums/http-methods'
import processedContentTypes from './enums/content-types'
import helpers from './helpers'

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

  async handle(req, res) {
    const { url, method } = req
    const path = new URL(url || '/', `http://${req.headers.host}`).pathname
    if (!this.handlers[path]?.[method]) {
      return new Response('NOT FOUND', {
        status: 404,
        statusText: 'NOT FOUND',
      })
    }

    let payload = {}
    if (req.headers.get('content-type')) {
      const contentType = req.headers.get('content-type').split(';')[0]
      if (processedContentTypes[contentType]) {
        payload = await processedContentTypes[contentType](req)
      }
    }

    let body = {}
    for (const handler of this.handlers[path][method]) {
      const response = await handler(req, Object.assign(res, helpers), payload)
      const resBody = await response.json()
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
  (req, res, payload) => {
    return res.json({ message: 'Get is working', payload })
  },
  (req, res, payload) => {
    return res.json({ message2: 'Get is working 2', payload })
  }
)

router.post('/hello', (req, res, payload) => {
  return res.json({ message: 'Post is working', payload })
})

export default router
