'use strict'

const axios = require('fvi-axios-client')

const { SkynetUrl } = require('./model')
const { buildSkynetUrl } = require('./utils')

const Core = require('./core')

module.exports = (opts = {}) => {
    const skynetUrl = SkynetUrl(opts.url)

    const client = axios({ url: skynetUrl, ...opts })
    const core = Core(client)
    core.getUrl = buildSkynetUrl

    return core
}
