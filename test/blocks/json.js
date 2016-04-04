import { expect } from 'chai'

import Json from '../../src/blocks/json'
const json = new Json()

describe('Json', () => {
  it('returns parse data correctly', () => {
    expect(json.run('{"foo": 123}')).to.deep.equal({ foo: 123 })
  })
})
