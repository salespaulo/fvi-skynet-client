'use strict'

const { buildSkynetUrl } = require('../utils')
const { validateDownloadOpts } = require('../validation')

const download = client => (skylink, opts = {}) => {
    const options = validateDownloadOpts({ skylink, ...opts })
    const url = buildSkynetUrl(options.endpoint, skylink)

    return client.get(url, { responseType: 'stream' })
}

module.exports = client => {
    return {
        download: download(client),
    }
}
