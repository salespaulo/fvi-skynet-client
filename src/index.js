'use strict'

const axios = require('fvi-axios-client')

const skynet = require('./core')
const { validateSkynetUrl } = require('./validation')

module.exports = (opts = {}) => {
    const url = validateSkynetUrl(opts.url)
    const client = axios({ url, ...opts })
    return skynet(client)
}
