import File from './blocks/file'
import Time from './blocks/time'
import Map from './blocks/map'
import ForEach from './blocks/forEach'
import ForecastIo from './blocks/forecast-io'
import Slack from './blocks/slack'
import Http from './blocks/http'
import Json from './blocks/json'
import ConsoleLog from './blocks/console-log'

const file = new File()
const time = new Time()
const map_x2 = new Map(value => value * 2)
const forecastIo = new ForecastIo()
const slack = new Slack()
const http = new Http()
const json = new Json()
const consoleLog = new ConsoleLog()

const map_forecastio = new Map(forecastIo.run)

let slackOut = ([location, icon, message]) => {
  slack.run({
    username: location,
    icon_emoji: icon,
    text: message
  })
}

const map_slack = new Map(slackOut)
const forEach_slack = new ForEach(slackOut)

// Promise.resolve([1, 2, 3])
//   .then(map_x2.run.bind(map_x2))
//   .then(consoleLog.run)
//
// Promise.resolve('http://httpbin.org/get')
//   .then(http.run)
//   .then(json.run)
//   .then(consoleLog.run)
//
// Promise.resolve([
//   ["New York", 40.7146, -74.0071],
//   ["Chicago", 41.8843, -87.6324],
//   ["San Francisco", 37.7771, -122.4196]
// ]).then(map_forecastio.run.bind(map_forecastio))
//   .then(consoleLog.run)
//   .catch(console.log)
//
// Promise.resolve({
//   text: 'ok!',
//   icon_emoji: ':sunny:'
// }).then(slack.run)

// file.run('src/locations.json')
//   .then(json.run)
//   .then(map_forecastio.run.bind(map_forecastio))
//   // .then(map_slack.run.bind(map_slack))
//   .then(forEach_slack.run.bind(map_slack))
//   .then(consoleLog.run)
//   .catch(console.log)

// file.run('test/fixtures/forecastio.json')
//   .then(forecastIo.run)
//   .then(consoleLog.run)
//   .catch(console.log)

time.run({duration: 3000})
  .then(consoleLog.run)
