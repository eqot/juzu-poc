export default class Map {
  constructor (func) {
    this.func = func
  }

  run (params) {
    if (Array.isArray(params)) {
      return Promise.all(params.map(this.func))
    }

    return new Promise((resolve, reject) => {
      const result = this.func(params)
      resolve(result)
    })
  }
}
