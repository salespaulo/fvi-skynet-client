'use strict'

const stringToFileStream = require('string-to-file-stream')

const chai = require('chai')
const axios = require('fvi-axios-client')

const Upload = require('../src/core/upload')
const { URI_SIA, DEFAULT_SKYNET_URL, DEFAULT_UPLOAD_URL } = require('../src/utils')

describe(`Module core/upload - MOCK`, () => {
    const mockSkylink = `${URI_SIA}CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg`
    const mock = true
    const url = DEFAULT_SKYNET_URL
    const opts = {
        mock,
        url,
    }
    let instance = null

    before(() => {
        const client = axios(opts)
        instance = Upload(client)

        if (!client.mock) {
            return
        }

        client.mock.onPost(DEFAULT_UPLOAD_URL).reply(200, {
            skylink: 'CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg',
            merkleroot: 'QAf9Q7dBSbMarLvyeE6HTQmwhr7RX9VMrP9xIMzpU3I',
            bitfield: 2048,
        })
    })

    it(`Testing instance functions - OK`, done => {
        chai.assert.exists(instance.file)
        chai.assert.isFunction(instance.file)
        chai.assert.exists(instance.directory)
        chai.assert.isFunction(instance.directory)
        done()
    })

    it(`Testing function - file`, done => {
        const stream = stringToFileStream(`Skynet Uploading File Mocked`)

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
        const stream1 = stringToFileStream(`1o. Stream Skynet Uploading Dir Mocked`)
        const stream2 = stringToFileStream(`2o. Stream Skynet Uploading Dir Mocked`)

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
