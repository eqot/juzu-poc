import http from 'http'
import https from 'https'

export default class Http {
  run (url) {
    return new Promise((resolve, reject) => {
      const connection = url.match(/^https/) ? https : http

      connection.get(url, (res) => {
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
    })
  }
}
