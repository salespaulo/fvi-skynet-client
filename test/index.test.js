'use strict'

const chai = require('chai')

const app = require('../src')

describe(`Module main - MOCK`, () => {
    const mock = true
    const url = 'http://'
    const delay = 100
    const timeout = 1000
    let options = null

    beforeEach(() => {
        options = {
            mock,
            url,
            delay,
            timeout,
        }
    })

    it(`Main Function Metadata - OK`, done => {
        chai.assert.exists(app)
        chai.assert.isFunction(app)
        done()
    })

    it(`Main Function - OK`, done => {
        app(options)
        done()
    })

    describe(`Testing functions`, () => {
        let instance = null
        before(() => {
            instance = app(options)
        })

        it(`Testing instance functions - OK`, done => {
            chai.assert.exists(instance.uploadFile)
            chai.assert.exists(instance.uploadDirectory)
            chai.assert.exists(instance.download)
            chai.assert.exists(instance.statistics)
            done()
        })

        it(`Testing function - uploadFile`, done => {
            done()
        })

        it(`Testing function - uploadFile`, done => {
            done()
        })

        it(`Testing function - download`, done => {
            done()
        })

        it(`Testing function - statistics`, done => {
            done()
        })
    })
})
