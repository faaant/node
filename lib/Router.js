import { METHODS } from './enums/Methods'

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

  handle() {} // TODO

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

export default router
