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
        chai.assert.exists(validation.validateDownloadOpts)
        chai.assert.isFunction(validation.validateDownloadOpts)
        chai.assert.exists(validation.validateSkynetUrl)
        chai.assert.isFunction(validation.validateSkynetUrl)

        done()
    })

    it(`Testing function - validateUploadOpts`, done => {
        const baseUrl = 'https://siasky.dev'
        const endpoint = '/skynet/skyfile'
        const filename = 'test-file-name'
        const stream = stringToFileStream('testing')
        const opts = { baseUrl, stream, endpoint, filename }

        validation.validateUploadOpts(opts)

        opts.stream = { invalid: true }
        try {
            validation.validateUploadOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"stream"'))
        }

        opts.stream = null
        try {
            validation.validateUploadOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"stream"'))
        }

        opts.stream = stream
        opts.baseUrl = 'invalid'
        try {
            validation.validateUploadOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"baseUrl"'))
            opts.baseUrl = baseUrl
        }

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

        opts.streams = [{ invalid: true }]
        try {
            validation.validateUploadOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('pipe'))
        }

        opts.streams = stream
        try {
            validation.validateUploadOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('must be an array'))
        }

        opts.streams = streams

        opts.endpoint = undefined
        validation.validateUploadOpts(opts)

        opts.filename = undefined
        validation.validateUploadOpts(opts)

        done()
    })

    it(`Testing function - validateDownloadOpts`, done => {
        const skylink = 'skylink-test-1'
        const endpoint = '/'
        const opts = { skylink, endpoint }

        validation.validateDownloadOpts(opts)

        opts.skylink = null
        try {
            validation.validateDownloadOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"skylink"'))
        }

        opts.skylink = skylink
        opts.endpoint = undefined
        validation.validateDownloadOpts(opts)

        done()
    })

    it(`Testing function - validateSkynetUrl`, done => {
        const testit = undefined
        const skyneturl = validation.validateSkynetUrl(testit)
        chai.assert.equal(DEFAULT_SKYNET_URL, skyneturl)
        done()
    })
})
