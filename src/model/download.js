'use strict'

const { Validator, Required, Default, isString, isNotEmpty } = require('fvi-js-validator')

const { DEFAULT_DOWNLOAD_URL } = require('../utils')

const create = Validator({
    skylink: Required([isString(), isNotEmpty()]),
    endpoint: Default(DEFAULT_DOWNLOAD_URL, [isString(), isNotEmpty()]),
})

module.exports = opts => create(opts)
