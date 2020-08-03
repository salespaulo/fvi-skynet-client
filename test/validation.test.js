'use strict'

const chai = require('chai')
const { Readable } = require('stream')

const validation = require('../src/validation')
const { DEFAULT_SKYNET_URL } = require('../src/utils')

describe(`Module validation`, () => {
    it(`Functions - OK`, done => {
        chai.assert.exists(validation)
        chai.assert.isObject(validation)
        chai.assert.exists(validation.validateUploadFileOpts)
        chai.assert.isFunction(validation.validateUploadFileOpts)
        chai.assert.exists(validation.validateUploadDirOpts)
        chai.assert.isFunction(validation.validateUploadDirOpts)
        chai.assert.exists(validation.validateDownloadOpts)
        chai.assert.isFunction(validation.validateDownloadOpts)
        chai.assert.exists(validation.validateSkynetUrl)
        chai.assert.isFunction(validation.validateSkynetUrl)

        done()
    })

    it(`Testing function - validateUploadFileOpts`, done => {
        const endpoint = '/skynet/skyfile'
        const filename = 'test-file-name'
        const dryRun = true
        const stream = new Readable()
        const opts = { stream, endpoint, filename, dryRun }

        validation.validateUploadFileOpts(opts)

        opts.stream = { invalid: true }
        try {
            validation.validateUploadFileOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"stream"'))
        }

        opts.stream = null
        try {
            validation.validateUploadFileOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"stream"'))
        }

        opts.stream = stream
        opts.dryRun = 'invalid'
        try {
            validation.validateUploadFileOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"dryRun"'))
        }

        opts.dryRun = undefined
        validation.validateUploadFileOpts(opts)

        opts.dryRun = false
        validation.validateUploadFileOpts(opts)

        opts.endpoint = undefined
        validation.validateUploadFileOpts(opts)

        opts.filename = undefined
        validation.validateUploadFileOpts(opts)

        done()
    })

    it(`Testing function - validateUploadDirOpts`, done => {
        const endpoint = '/skynet/skyfile'
        const filename = 'test-file-name'
        const dryRun = true
        const stream = new Readable()
        const streams = [stream]
        const opts = { streams, endpoint, filename, dryRun }

        validation.validateUploadDirOpts(opts)

        opts.streams = [{ invalid: true }]
        try {
            validation.validateUploadDirOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('pipe'))
        }

        opts.streams = stream
        try {
            validation.validateUploadDirOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('must be an array'))
        }

        opts.streams = streams
        opts.dryRun = 'invalid'
        try {
            validation.validateUploadDirOpts(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"dryRun"'))
        }

        opts.dryRun = undefined
        validation.validateUploadDirOpts(opts)

        opts.dryRun = false
        validation.validateUploadDirOpts(opts)

        opts.endpoint = undefined
        validation.validateUploadDirOpts(opts)

        opts.filename = undefined
        validation.validateUploadDirOpts(opts)

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
