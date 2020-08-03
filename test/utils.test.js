'use strict'

const chai = require('chai')
const joi = require('@hapi/joi')

const utils = require('../src/utils')

describe(`Module utils`, () => {
    it(`Functinos - OK`, done => {
        chai.assert.exists(utils)
        chai.assert.isObject(utils)
        chai.assert.exists(utils.URI_SIA)
        chai.assert.exists(utils.DEFAULT_SKYNET_URL)
        chai.assert.exists(utils.buildSkynetUrl)
        chai.assert.isFunction(utils.buildSkynetUrl)
        chai.assert.exists(utils.throwsIfInvalidJoiSchema)
        chai.assert.isFunction(utils.throwsIfInvalidJoiSchema)
        done()
    })

    it(`Testing constant - URI_SIA`, done => {
        chai.assert.equal(`sia://`, utils.URI_SIA)
        done()
    })

    it(`Testing constant - DEFAULT_SKYNET_URL`, done => {
        chai.assert.equal(`https://siasky.net`, utils.DEFAULT_SKYNET_URL)
        done()
    })

    it(`Testing function - buildSkynetUrl`, done => {
        const endpoint = '/skynet/skyfile'
        let skylink = `${utils.URI_SIA}valid-one`
        const skynetUrl = utils.buildSkynetUrl(endpoint, skylink)
        chai.assert.exists(skynetUrl)
        chai.assert.isString(skynetUrl)
        chai.assert.equal(`${endpoint}/${skylink.slice(utils.URI_SIA.length)}`, skynetUrl)

        skylink = `invalid-one`

        try {
            utils.buildSkynetUrl(endpoint, skylink)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.startsWith('Invalid skylink'))
        }

        try {
            utils.buildSkynetUrl(null, skylink)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"endpoint"'))
        }

        try {
            utils.buildSkynetUrl(endpoint, null)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"skylink"'))
            done()
        }
    })

    it(`Testing function - throwsIfInvalidJoiSchema`, done => {
        const joiSchema = joi.object({ id: joi.string().required() })
        const funcValidate = utils.throwsIfInvalidJoiSchema(joiSchema)

        chai.assert.exists(funcValidate)
        chai.assert.isFunction(funcValidate)

        const obj = { id: 'valid one' }
        const value = funcValidate(obj)
        chai.assert.exists(value)
        chai.assert.equal(obj.id, value.id)

        obj.id = undefined
        try {
            funcValidate(obj)
            done(`Should be throws an error!`)
        } catch (e) {
            chai.assert.exists(e)
            chai.assert.exists(e.message)
            chai.assert.isString(e.message)
            chai.assert.isTrue(e.message.includes('"id"'))
            done()
        }
    })
})
