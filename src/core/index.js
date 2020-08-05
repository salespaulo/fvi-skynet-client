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
        uploadFileStream: upload.fileStream,
        uploadDirectoryStream: upload.directoryStreams,
        download: download.download,
        statistics: statistics.stats,
        mock: client.mock,
    }
}
