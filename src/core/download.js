'use strict'

const { Readable } = require('stream')

const { buildSkynetUrl } = require('../utils')
const { validateDownloadOpts } = require('../validation')

const downloadMock = (client, url) => {
    if (!client.mock) {
        return
    }

    const stream = new Readable()
    stream.push(JSON.stringify({ message: `Skynet Download Mocked url=${url}!` }))
    stream.push(null)

    client.mock.onGet(url, { responseType: 'stream' }).reply(200, stream)
}

const download = client => (skylink, opts = {}) => {
    const options = validateDownloadOpts({ skylink, ...opts })
    const url = buildSkynetUrl(options.endpoint, skylink)
    downloadMock(client, url)
    return client.get(url, { responseType: 'stream' })
}

module.exports = client => {
    return {
        download: download(client),
    }
}
