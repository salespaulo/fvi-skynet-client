'use strict'

const { validateUploadResponse } = require('./validation')
const { setUriSiaPrefix } = require('../utils')

module.exports = rawResponse => {
    const res = validateUploadResponse(rawResponse)
    res.data.skylink = setUriSiaPrefix(res.data.skylink)

    return {
        status: res.status,
        data: res.data,
    }
}
