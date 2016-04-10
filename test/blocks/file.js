import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import File from '../../src/blocks/file'
const file = new File()

describe('File', () => {
  it('loads correct content from file', () => {
    const content = file.run('test/fixtures/test.txt')

    return expect(content).to.eventually.equal('Test\nok!\n')
  })
})
