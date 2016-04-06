import url from 'url'
import http from 'http'
import https from 'https'

export default class Http {
  run (req) {
    return new Promise((resolve, reject) => {
      const urlData = url.parse(typeof req === 'string' ? req : req.url)

      let options = {
        hostname: urlData.host,
        path: urlData.path,
        method: req.method || 'GET'
      }

      if (options.method === 'POST') {
        options = {
          ...options,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': req.data.length
          }
        };
      }

      const connection = (urlData.protocol === 'https:') ? https : http

      const request = connection.request(options, (res) => {
        let body = ''

        res.on('data', (chunk) => {
          body += chunk
        })

        res.on('end', () => {
          if (body.length > 0) {
            resolve(body)
          } else {
            reject()
          }
        })
      }).on('error', reject)

      if (req.data) {
        request.write(req.data)
      }

      request.end()
    })
  }
}
