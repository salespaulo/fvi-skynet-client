'use strict'

const fs = require('fs')
const path = require('path')

const chai = require('chai')
const axios = require('fvi-axios-client')

const Upload = require('../src/core/upload')
const { URI_SIA, DEFAULT_SKYNET_URL, DEFAULT_UPLOAD_URL } = require('../src/utils')
const mock = true

describe(`Module core/upload - MOCK=${mock}`, () => {
    const baseTestDir = path.join(__dirname, '.data')
    const fileTest1 = path.join(baseTestDir, 'test1.json')
    const fileTest2 = path.join(baseTestDir, 'test2.json')

    const mockSkylink = `${URI_SIA}CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg`
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

    beforeEach(() => {
        if (!fs.existsSync(baseTestDir)) {
            fs.mkdirSync(baseTestDir)
        }
        fs.writeFileSync(fileTest1, JSON.stringify({ msg: 'Test1' }))
        fs.writeFileSync(fileTest2, JSON.stringify({ msg: 'Test2' }))
    })

    afterEach(() => {
        if (fs.existsSync(baseTestDir)) {
            fs.readdirSync(baseTestDir).forEach(f => fs.unlinkSync(path.join(baseTestDir, f)))
        }
    })

    it(`Testing instance functions - OK`, done => {
        chai.assert.exists(instance.file)
        chai.assert.isFunction(instance.file)
        chai.assert.exists(instance.directory)
        chai.assert.isFunction(instance.directory)
        done()
    })

    // FIX: Node not implements WebAPI new File([], path.join(file.path, file.name)) //
    it(`Testing function - file`, done => {
        const file = fs.createReadStream(fileTest1)
        file.name = 'test1.json'

        instance
            .file(file)
            .then(res => {
                chai.assert.isObject(res.data)
                chai.assert.exists(res.data.skylink)
                if (mock) chai.assert.equal(mockSkylink, res.data.skylink)
                done()
            })
            .catch(done)
    })

    // FIX: Node not implements WebAPI new File([], path.join(file.path, file.name)) //
    it(`Testing function - directory`, done => {
        const file1 = fs.createReadStream(fileTest1)
        file1.name = 'test1.json'
        file1.path = baseTestDir
        const file2 = fs.createReadStream(fileTest2)
        file2.name = 'test2.json'
        file2.path = baseTestDir

        instance
            .directory([file1, file2])
            .then(res => {
                chai.assert.isObject(res.data)
                chai.assert.exists(res.data.skylink)
                if (mock) chai.assert.equal(mockSkylink, res.data.skylink)
                done()
            })
            .catch(done)
    })

    it(`Testing function - file stream`, done => {
        const stream = fs.createReadStream(fileTest1)

        instance
            .fileStream(stream)
            .then(res => {
                chai.assert.isObject(res.data)
                chai.assert.exists(res.data.skylink)
                if (mock) chai.assert.equal(mockSkylink, res.data.skylink)
                done()
            })
            .catch(done)
    })

    it(`Testing function - directory stream`, done => {
        const stream1 = fs.createReadStream(fileTest1)
        const stream2 = fs.createReadStream(fileTest2)

        instance
            .directoryStreams([stream1, stream2])
            .then(res => {
                chai.assert.isObject(res.data)
                chai.assert.exists(res.data.skylink)
                if (mock) chai.assert.equal(mockSkylink, res.data.skylink)
                done()
            })
            .catch(done)
    })
})
