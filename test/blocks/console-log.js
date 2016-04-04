import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

import ConsoleLog from '../../src/blocks/console-log'
const consoleLog = new ConsoleLog()

describe('ConsoleLog', () => {
  it('returns input value', () => {
    return expect(consoleLog.run('test')).to.eventually.equal('test')
  })
})
