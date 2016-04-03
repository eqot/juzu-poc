export default class Map {
  constructor (func) {
    this.func = func
  }

  run (params) {
    return Promise.all(params.map(this.func))
  }
}
