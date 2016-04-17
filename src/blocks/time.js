export default class Time {
  run (params, callback) {
    if (params.time && typeof params.time === 'string') {
      this.setTimeTimer(params, callback)
    } else {
      this.setDurationTimer(params, callback)
    }
  }

  setDurationTimer (params, callback) {
    if (params.loop) {
      setInterval(() => {
        callback()
      }, params.duration)
    } else {
      setTimeout(() => {
        callback()
      }, params.duration)
    }
  }

  setTimeTimer (params, callback) {
    const [hour, minute, second] = params.time.split(':')

    let date = new Date()

    date.setHours(hour || 0)
    date.setMinutes(minute || 0)
    date.setSeconds(second || 0)

    const currentDate = new Date()
    let duration = date.getTime() - currentDate.getTime()
    if (duration < 0) {
      duration += (1000 * 60 * 60 * 24)
    }

    setTimeout(() => {
      callback()

      setTimeout(() => {
        if (params.loop) {
          this.setTimeTimer(params, callback)
        }
      }, 1000)
    }, duration)
  }
}
