'use strict'

const chai = require('chai')
const axios = require('fvi-axios-client')

const Upload = require('../src/core/upload')

describe(`Module core/upload - MOCK`, () => {
    const mock = true
    const url = 'http://'
    const opts = {
        mock,
        url,
    }
    let instance = null

    before(() => {
        const client = axios(opts)
        instance = Upload(client)
    })

    it(`Testing instance functions - OK`, done => {
        chai.assert.exists(instance.file)
        chai.assert.isFunction(instance.file)
        chai.assert.exists(instance.directory)
        chai.assert.isFunction(instance.directory)
        done()
    })

    it(`Testing function - file`, done => {
        done()
    })

    it(`Testing function - directory`, done => {
        done()
    })
})
