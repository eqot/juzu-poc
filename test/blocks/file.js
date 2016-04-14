import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import File from '../../src/blocks/file'
const file = new File()

describe('File', () => {
  it('loads correct content from file', () => {
    const content = file.run('test/fixtures/test.txt')

    expect(content).to.eventually.equal('Test\nok!\n')
  })

  it('rejects if file does not exist', () => {
    const content = file.run('no_file.txt')

    expect(content).to.be.rejectedWith(Error)
  })
})
