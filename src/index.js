import Map from './blocks/map'
import Http from './blocks/http'
import ConsoleLog from './blocks/console-log'

const map_x2 = new Map(value => value * 2)
const http = new Http()
const consoleLog = new ConsoleLog()

Promise.resolve([1, 2, 3])
  .then(map_x2.run.bind(map_x2))
  .then(consoleLog.run)

Promise.resolve('http://httpbin.org/get')
  .then(http.run)
  .then(consoleLog.run)
