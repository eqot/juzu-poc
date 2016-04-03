export default class ConsoleLog {
  run (params) {
    return new Promise((resolve, reject) => {
      console.log(params)
      resolve(params)
    })
  }
}
