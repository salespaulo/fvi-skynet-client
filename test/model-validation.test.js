'use strict'

const chai = require('chai')
const stringToFileStream = require('string-to-file-stream')

const validation = require('../src/model/validation')
const { DEFAULT_SKYNET_URL } = require('../src/utils')

describe(`Module validation`, () => {
    it(`Functions - OK`, done => {
        chai.assert.exists(validation)
        chai.assert.isObject(validation)
        chai.assert.exists(validation.validateUploadOpts)
        chai.assert.isFunction(validation.validateUploadOpts)
        chai.assert.exists(validation.validateUploadOpts)
        chai.assert.isFunction(validation.validateUploadOpts)

        done()
    })

    it(`Testing function - validateUploadOpts`, done => {
        const baseUrl = 'https://siasky.dev'
        const endpoint = '/skynet/skyfile'
        const filename = 'test-file-name'
        const stream = stringToFileStream('testing')
        const opts = { baseUrl, stream, endpoint, filename }

        validation.validateUploadOpts(opts)

        opts.endpoint = undefined
        validation.validateUploadOpts(opts)

        opts.filename = undefined
        validation.validateUploadOpts(opts)

        done()
    })

    it(`Testing function - validateUploadOpts`, done => {
        const baseUrl = 'https://siasky.dev'
        const endpoint = '/skynet/skyfile'
        const filename = 'test-file-name'
        const stream = stringToFileStream('testing')
        const streams = [stream]
        const opts = { baseUrl, streams, endpoint, filename }

        validation.validateUploadOpts(opts)

        opts.streams = streams

        opts.endpoint = undefined
        validation.validateUploadOpts(opts)

        opts.filename = undefined
        validation.validateUploadOpts(opts)

        done()
    })
})
