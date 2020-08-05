'use strict'

const { SkynetUpload, SkynetUploadResponse } = require('../model')
const { FORM_PARAM_UPLOAD_DIR } = require('../utils')

const doPost = (client, uploadModel) => {
    return client
        .post(uploadModel.url, uploadModel.form, {
            headers: {
                'User-Agent': 'Sia-Agent',
                ...uploadModel.form.getHeaders(),
            },
            onUploadProgress: ({ loaded, total }) => {
                const progress = loaded / total

                uploadModel.onUploadProgress(progress, { loaded, total })
            },
        })
        .then(res => SkynetUploadResponse(res))
}

const fileStream = client => (stream, opts = {}) => {
    const skynetUploadFileStream = SkynetUpload({ baseUrl: client.getUri(), stream, ...opts })
    return doPost(client, skynetUploadFileStream)
}

const directoryStreams = client => (streams, opts = {}) => {
    const skynetUploadDirStream = SkynetUpload({
        baseUrl: client.getUri(),
        streams,
        formParam: FORM_PARAM_UPLOAD_DIR,
        ...opts,
    })
    return doPost(client, skynetUploadDirStream)
}

const file = client => (file, opts = {}) => {
    const skynetUploadFile = SkynetUpload({ baseUrl: client.getUri(), file, ...opts })
    return doPost(client, skynetUploadFile)
}

const directory = client => (files, opts = {}) => {
    const skynetUploadDir = SkynetUpload({
        baseUrl: client.getUri(),
        files,
        formParam: FORM_PARAM_UPLOAD_DIR,
        ...opts,
    })
    return doPost(client, skynetUploadDir)
}

module.exports = client => {
    return {
        file: file(client),
        directory: directory(client),
        fileStream: fileStream(client),
        directoryStreams: directoryStreams(client),
    }
}
