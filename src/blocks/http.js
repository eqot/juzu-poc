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

      let postData = null;
      if (options.method === 'POST') {
        postData = 'payload=' + JSON.stringify(req.data)

        options = {
          ...options,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
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
          }
        })
      }).on('error', reject)

      if (postData) {
        request.write(postData)
      }

      request.end()
    })
  }
}
