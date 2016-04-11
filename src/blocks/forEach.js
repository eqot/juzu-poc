export default class ForEach {
  constructor (func) {
    this.func = func
  }

  run (params) {
    params.forEach(this.func)
    return params
  }
}
