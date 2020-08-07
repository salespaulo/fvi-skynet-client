'use strict'

const { Validator, Required, isInteger, isMin, isNotEmpty } = require('fvi-js-validator')

const { setUriSiaPrefix } = require('../utils')

const create = Validator({
    status: Required([isInteger(), isMin(200)]),
    data: [isNotEmpty()],
})

module.exports = rawResponse => {
    const res = create(rawResponse)
    res.data.skylink = setUriSiaPrefix(res.data.skylink)

    return {
        status: res.status,
        data: res.data,
    }
}
