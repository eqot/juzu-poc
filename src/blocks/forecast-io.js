import Http from './http'
import Json from './json'

const http = new Http()
const json = new Json()

export default class ForecastIo {
  static EMOJIS = {
    'clear-day': ':sunny:',
    'clear-night': ':sunny:',
    'rain': ':umbrella:',
    'snow': ':snowflake:',
    'sleet': ':snowflake:',
    'wind': ':ocean:',
    'fog': ':foggy:',
    'cloudy': ':cloud:',
    'partly-cloudy-day': ':cloud:',
    'partly-cloudy-night': ':cloud:'
  }

  run (params) {
    return new Promise((resolve, reject) => {
      let promise = null
      let location = 'No location'
      if (typeof params === 'string') {
        promise = Promise.resolve(params)
      } else {
        location = params[0]
        const [, lat, lng] = params

        const apiKey = process.env.FORECASTIO_APIKEY
        if (!apiKey) {
          reject(new Error('No API key for forecast.io'))
        }

        const url = 'https://api.forecast.io/forecast/' + apiKey + '/' +
          lat + ',' + lng + '?exclude=currently,minutely,hourly,flags&units=si'

        promise = http.run(url)
      }

      promise
        .then(json.run)
        .then((data) => {
          const weather = data.daily.data[1]
          resolve([location, ForecastIo.EMOJIS[weather.icon], weather.summary])
        })
        .catch(reject)
    })
  }
}
