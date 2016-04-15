import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import Map from '../../src/blocks/map'
const map_x2 = new Map((value) => value * 2)

describe('Map', () => {
  it('returns correct array', () => {
    return expect(map_x2.run([1, 2, 3])).to.eventually.deep.equal([2, 4, 6])
  })

  it('returns correct value if argument is not array', () => {
    return expect(map_x2.run(123)).to.eventually.deep.equal(246)
  })
})
