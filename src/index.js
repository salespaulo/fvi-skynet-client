'use strict'

const axios = require('fvi-axios-client')

const Core = require('./core')
const { validateSkynetUrl } = require('./validation')

module.exports = (opts = {}) => {
    const url = validateSkynetUrl(opts.url)

    const client = axios({ url, ...opts })
    const core = Core(client)

    return {
        url,
        ...core,
    }
}
