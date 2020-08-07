'use strict'

const chai = require('chai')
const stringToFileStream = require('string-to-file-stream')

const model = require('../src/model')
const { DEFAULT_SKYNET_URL } = require('../src/utils')

describe(`Module model`, () => {
    it(`Functions - OK`, done => {
        chai.assert.exists(model)
        chai.assert.isObject(model)
        chai.assert.exists(model.SkynetUrl)
        chai.assert.isFunction(model.SkynetUrl)
        chai.assert.exists(model.SkynetDownload)
        chai.assert.isFunction(model.SkynetDownload)
        chai.assert.exists(model.SkynetUpload)
        chai.assert.isFunction(model.SkynetUpload)
        chai.assert.exists(model.SkynetUploadResponse)
        chai.assert.isFunction(model.SkynetUploadResponse)

        done()
    })

    it(`Testing function - model.SkynetUpload with file`, done => {
        const baseUrl = 'https://siasky.dev'
        const endpoint = '/skynet/skyfile'
        const filename = 'test-file-name'
        const stream = stringToFileStream('testing')
        const opts = { baseUrl, stream, endpoint, filename }

        model.SkynetUpload(opts)

        opts.stream = stream
        opts.endpoint = undefined
        model.SkynetUpload(opts)

        opts.filename = undefined
        model.SkynetUpload(opts)

        done()
    })

    it(`Testing function - model.SkynetUpload with stream`, done => {
        const baseUrl = 'https://siasky.dev'
        const endpoint = '/skynet/skyfile'
        const filename = 'test-file-name'
        const stream = stringToFileStream('testing')
        const streams = [stream]
        const opts = { baseUrl, streams, endpoint, filename }

        model.SkynetUpload(opts)

        opts.streams = streams

        opts.endpoint = undefined
        model.SkynetUpload(opts)

        opts.filename = undefined
        model.SkynetUpload(opts)

        done()
    })

    it(`Testing function - model.SkynetDownload`, done => {
        const skylink = 'skylink-test-1'
        const endpoint = '/'
        const opts = { skylink, endpoint }

        model.SkynetDownload(opts)

        opts.skylink = null
        try {
            model.SkynetDownload(opts)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"skylink"'))
        }

        opts.skylink = skylink
        opts.endpoint = undefined
        model.SkynetDownload(opts)

        done()
    })

    it(`Testing function - model.SkynetUrl`, done => {
        const testit = undefined
        const skyneturl = model.SkynetUrl(testit)
        chai.assert.equal(DEFAULT_SKYNET_URL, skyneturl)
        done()
    })
})
