export default class Time {
  run (params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, params.duration)
    })
  }
}
