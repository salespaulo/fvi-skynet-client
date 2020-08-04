'use strict'

const axios = require('fvi-axios-client')

const { URI_SIA } = require('./utils')
const { validateSkynetUrl } = require('./validation')

const Core = require('./core')

module.exports = (opts = {}) => {
    const url = validateSkynetUrl(opts.url)

    const client = axios({ url, ...opts })
    const core = Core(client)

    return {
        getUrl: skylink => `${url}/${skylink.slice(URI_SIA.length)}`,
        ...core,
    }
}
