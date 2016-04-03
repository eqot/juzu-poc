import Map from './blocks/map'
import Http from './blocks/http'
import Json from './blocks/json'
import ConsoleLog from './blocks/console-log'

const map_x2 = new Map(value => value * 2)
const http = new Http()
const json = new Json()
const consoleLog = new ConsoleLog()

Promise.resolve([1, 2, 3])
  .then(map_x2.run.bind(map_x2))
  .then(consoleLog.run)

Promise.resolve('http://httpbin.org/get')
  .then(http.run)
  .then(json.run)
  .then(consoleLog.run)
