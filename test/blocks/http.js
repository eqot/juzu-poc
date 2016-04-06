import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
import nock from 'nock'

import Http from '../../src/blocks/http'
const httpRequest = new Http()

describe('Http', () => {
  describe('GET', () => {
    beforeEach(() => {
      nock('http://www.example.com')
        .get('/resource')
        .reply(200, 'res body')
      nock('https://www.example.com')
        .get('/resource')
        .reply(200, 'res body')
    })

    it('returns correct body with http', () => {
      const promise = httpRequest.run('http://www.example.com/resource')

      return expect(promise).to.eventually.equal('res body')
    })

    it('returns correct body with https', () => {
      const promise = httpRequest.run('https://www.example.com/resource')

      return expect(promise).to.eventually.equal('res body')
    })

    afterEach(() => {
      nock.cleanAll()
    })
  })

  describe('POST', () => {
    beforeEach(() => {
      nock('http://www.example.com')
        .post('/test', 'req body')
        .reply(200, 'res body');
      nock('https://www.example.com')
        .post('/test', 'req body')
        .reply(200, 'res body');
    })

    it('sends and returns correct body with http', () => {
      const request = {
        method: 'POST',
        url: 'http://www.example.com/test',
        data: 'req body'
      }

      const promise = httpRequest.run(request)

      return expect(promise).to.eventually.equal('res body')
    })

    it('sends and returns correct body with https', () => {
      const request = {
        method: 'POST',
        url: 'https://www.example.com/test',
        data: 'req body'
      }

      const promise = httpRequest.run(request)

      return expect(promise).to.eventually.equal('res body')
    })

    afterEach(() => {
      nock.cleanAll()
    })
  })
})
