import { safeJSON, safeURLencoded } from '../utils'

const processedContentTypes = {
  'text/html': (req) => req.text(),
  'text/plain': (req) => req.text(),
  'application/json': (req) => safeJSON(req, {}),
  'application/x-www-form-urlencoded': (req) => safeURLencoded(req, {}),
}

export default processedContentTypes
