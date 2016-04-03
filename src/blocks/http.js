import http from 'http'

export default class Http {
  run (url) {
    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
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
