import url from 'url'
import http from 'http'
import https from 'https'

export default class Http {
  run (req) {
    return new Promise((resolve, reject) => {
      const urlData = url.parse(req.url)

      const connection = (urlData.protocol === 'https:') ? https : http

      const postData = 'payload=' + JSON.stringify(req.data)

      var options = {
        hostname: urlData.host,
        path: urlData.path,
        method: req.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };

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

      request.write(postData)
      request.end()
    })
  }
}
