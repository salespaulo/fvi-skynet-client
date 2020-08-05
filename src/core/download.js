'use strict'

const { buildSkynetUrl } = require('../utils')
const { SkynetDownload } = require('../model')

const download = client => (skylink, opts = {}) => {
    const skynetDownload = SkynetDownload({ skylink, ...opts })
    const url = buildSkynetUrl(skynetDownload.endpoint, skylink)

    return client.get(url, { responseType: 'stream' })
}

module.exports = client => {
    return {
        download: download(client),
    }
}
