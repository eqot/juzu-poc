export default class Time {
  run (params, callback) {
    if (params.loop) {
      setInterval(() => {
        callback()
      }, params.duration)
    } else {
      setTimeout(() => {
        callback();
      }, params.duration)
    }
  }
}
