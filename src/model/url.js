'use strict'

const { Validator, Default, isString, isNotEmpty } = require('fvi-js-validator')

const { DEFAULT_SKYNET_URL } = require('../utils')

const create = Validator({
    skylink: Default(DEFAULT_SKYNET_URL, [isString(), isNotEmpty()]),
})

module.exports = skylink => create({ skylink }).skylink
