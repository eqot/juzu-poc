import Map from './blocks/map'
import ForecastIo from './blocks/forecast-io'
import Http from './blocks/http'
import Json from './blocks/json'
import ConsoleLog from './blocks/console-log'

const map_x2 = new Map(value => value * 2)
const forecastIo = new ForecastIo()
const http = new Http()
const json = new Json()
const consoleLog = new ConsoleLog()

const map_forecastio = new Map(forecastIo.run)

Promise.resolve([1, 2, 3])
  .then(map_x2.run.bind(map_x2))
  .then(consoleLog.run)

Promise.resolve('http://httpbin.org/get')
  .then(http.run)
  .then(json.run)
  .then(consoleLog.run)

Promise.resolve([
  ["New York", 40.7146, -74.0071],
  ["Chicago", 41.8843, -87.6324],
  ["San Francisco", 37.7771, -122.4196]
]).then(map_forecastio.run.bind(map_forecastio))
  .then(consoleLog.run)
  .catch(console.log)
