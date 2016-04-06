import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import nock from 'nock'

const sandbox = require('sinon').sandbox.create()

import ForecastIo from '../../src/blocks/forecast-io'
const forecastIo = new ForecastIo()

describe('ForecastIo', () => {
  beforeEach(() => {
    const API_KEY = 'DUMMY_KEY'

    sandbox.stub(process.env, 'FORECASTIO_APIKEY', API_KEY)

    nock('https://api.forecast.io')
      .get('/forecast/' + API_KEY + '/123.45,-67.89?exclude=currently,minutely,hourly,flags&units=si')
      .reply(200, '{ "daily": { "data": ["sunny", { "summary": "rainy" } ] } }')
  })

  it('returns correct weather', () => {
    const promise = forecastIo.run(['place', 123.45, -67.89])

    return expect(promise).to.eventually.deep.equal(['place', 'rainy'])
  })

  afterEach(() => {
    nock.cleanAll()

    sandbox.restore()
  })
})
