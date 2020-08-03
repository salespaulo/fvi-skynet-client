'use strict'

const Upload = require('./upload')
const Download = require('./download')
const Statistics = require('./statistics')

module.exports = client => {
    const upload = Upload(client)
    const download = Download(client)
    const statistics = Statistics(client)

    return {
        uploadFile: upload.file,
        uploadDirectory: upload.directory,
        download: download.download,
        statistics: statistics.stats,
    }
}
