'use strict'

const fs = require('fs')
const chai = require('chai')
const stringToFileStream = require('string-to-file-stream')

const axios = require('fvi-axios-client')

const Download = require('../src/core/download')
const { URI_SIA } = require('../src/utils')

describe(`Module core/download - MOCK`, () => {
    const skylink = `${URI_SIA}skylink-test-${new Date().toISOString()}`
    const mock = true
    const url = 'http://'
    const opts = {
        mock,
        url,
    }
    let instance = null

    before(() => {
        const client = axios(opts)
        const stream = stringToFileStream(`Skynet Download Mocked url!`)

        client.mock
            .onGet(`/${skylink.slice(URI_SIA.length)}`, { responseType: 'stream' })
            .reply(200, stream)

        instance = Download(client)
    })

    it(`Testing instance functions - OK`, done => {
        chai.assert.exists(instance.download)
        chai.assert.isFunction(instance.download)
        done()
    })

    it(`Testing function - download`, done => {
        const pathTest = skylink.slice(URI_SIA.length)
        const write = fs.createWriteStream(pathTest)

        instance
            .download(skylink)
            .then(res => {
                res.data.pipe(write)
                write.on('finish', () => {
                    const writeContent = fs.readFileSync(pathTest)
                    fs.unlinkSync(pathTest)

                    const startsWith = `Skynet Download Mocked url!`
                    chai.assert.equal(startsWith, writeContent.toString('utf-8'))
                    done()
                })
                write.on('error', e => done(e))
            })
            .catch(done)
    })
})
