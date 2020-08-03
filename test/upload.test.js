'use strict'

const { Readable } = require('stream')

const chai = require('chai')
const axios = require('fvi-axios-client')

const Upload = require('../src/core/upload')
const { URI_SIA } = require('../src/utils')

describe(`Module core/upload - MOCK`, () => {
    const mockSkylink = `${URI_SIA}CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg`
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
        const stream = new Readable()
        stream.push(`Skynet Uploading File Mocked`)
        stream.push(null)

        instance
            .file(stream)
            .then(res => {
                chai.assert.isObject(res.data)
                chai.assert.exists(res.data.skylink)
                chai.assert.equal(mockSkylink, res.data.skylink)
                done()
            })
            .catch(done)
    })

    it(`Testing function - directory`, done => {
        const stream1 = new Readable()
        stream1.push(`1o. Stream Skynet Uploading Dir Mocked`)
        stream1.push(null)
        const stream2 = new Readable()
        stream2.push(`2o. Stream Skynet Uploading Dir Mocked`)
        stream2.push(null)

        instance
            .directory([stream1, stream2])
            .then(res => {
                chai.assert.isObject(res.data)
                chai.assert.exists(res.data.skylink)
                chai.assert.equal(mockSkylink, res.data.skylink)
                done()
            })
            .catch(done)
    })
})
