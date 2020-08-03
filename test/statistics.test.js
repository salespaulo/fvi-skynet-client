'use strict'

const chai = require('chai')
const axios = require('fvi-axios-client')

const Statistics = require('../src/core/statistics')

describe(`Module core/statistics - MOCK`, () => {
    const mock = true
    const url = 'http://'
    const opts = {
        mock,
        url,
    }
    let instance = null

    before(() => {
        const client = axios(opts)
        instance = Statistics(client)
    })

    it(`Testing instance functions - OK`, done => {
        chai.assert.exists(instance.stats)
        chai.assert.isFunction(instance.stats)
        done()
    })

    it(`Testing function - stats`, done => {
        instance
            .stats()
            .then(res => {
                chai.assert.isObject(res.data)
                chai.assert.exists(res.data.uptime)
                chai.assert.equal(1234, res.data.uptime)
                chai.assert.exists(res.data.uploadstats)
                chai.assert.exists(res.data.versioninfo)
                chai.assert.exists(res.data.performancestats)
                done()
            })
            .catch(done)
    })
})
