import Map from './blocks/map'
import ConsoleLog from './blocks/console-log'

const map_x2 = new Map(value => value * 2)
const consoleLog = new ConsoleLog()

Promise.resolve([1, 2, 3])
  .then(map_x2.run.bind(map_x2))
  .then(consoleLog.run)
