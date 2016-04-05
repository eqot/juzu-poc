import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import Http from '../../src/blocks/http'
const httpRequest = new Http()

describe('Http', () => {
  it('returns correct body', () => {
    return expect(httpRequest.run('http://httpbin.org/headers')).to
      .eventually.equal('{\n  "headers": {\n    "Host": "httpbin.org"\n  }\n}\n')
  })
})
