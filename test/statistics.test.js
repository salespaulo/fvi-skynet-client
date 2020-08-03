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
        done()
    })
})
