import Http from './http'
import Json from './json'

const http = new Http()
const json = new Json()

export default class Slack {
  run (data) {
    return new Promise((resolve, reject) => {
      const apiKey = process.env.SLACK_APIKEY
      if (!apiKey) {
        reject(new Error('No API key for Slack'))
      }

      const url = 'https://hooks.slack.com/services/' + apiKey

      const request = {
        method: 'POST',
        url,
        data: 'payload=' + JSON.stringify(data)
      }

      Promise.resolve(request)
        .then(http.run)
        .then(json.run)
        .then(resolve)
        .catch(reject)
    })
  }
}
