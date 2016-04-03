import Http from './http'
import Json from './json'

const http = new Http()
const json = new Json()

export default class ForecastIo {
  run (params) {
    return new Promise((resolve, reject) => {
      const [lat, lng] = params

      const apiKey = process.env.FORECASTIO_APIKEY
      if (!apiKey) {
        reject(new Error('No API key for forecast.io'))
      }

      const url = 'https://api.forecast.io/forecast/' + apiKey + '/' +
        lat + ',' + lng + '?exclude=currently,minutely,hourly,flags&units=si'

      Promise.resolve(url)
        .then(http.run)
        .then(json.run)
        .then((data) => {
          const weather = data.daily.data[1]
          resolve(weather.summary)
        })
        .catch(reject)
    })
  }
}