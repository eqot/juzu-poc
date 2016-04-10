import { expect } from 'chai'

import Json from '../../src/blocks/json'
const json = new Json()

describe('Json', () => {
  it('returns parse data correctly', () => {
    expect(json.run('{"foo": 123}')).to.deep.equal({ foo: 123 })
  })

  it('returns null if string is null', () => {
    expect(json.run(null)).to.be.null
  })

  it('throws SyntaxError exception if string is undfined', () => {
    expect(json.run.bind(json, undefined)).to.throw(SyntaxError)
  })

  it('throws SyntaxError exception if string is invalid JSON', () => {
    expect(json.run.bind(json, 'not valid')).to.throw(SyntaxError)
  })
})
