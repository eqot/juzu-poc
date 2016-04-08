import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import nock from 'nock'

const sandbox = require('sinon').sandbox.create()

import Slack from '../../src/blocks/slack'
const slack = new Slack()

describe('Slack', () => {
  beforeEach(() => {
    const API_KEY = 'DUMMY_KEY'

    sandbox.stub(process.env, 'SLACK_APIKEY', API_KEY)

    nock('https://hooks.slack.com')
      .post('/services/' + API_KEY, 'payload="message"')
      .reply(200, '"res body"')
  })

  it('returns correct body', () => {
    const promise = slack.run('message')

    return expect(promise).to.eventually.equal('res body')
  })

  afterEach(() => {
    nock.cleanAll()

    sandbox.restore()
  })
})
