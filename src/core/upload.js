'use strict'

const FormData = require('form-data')

const { validateUploadFileOpts, validateUploadDirOpts } = require('../validation')
const { URI_SIA } = require('../utils')

const formatRes = res => {
    res.data.skylink = `${URI_SIA}${res.data.skylink}`

    return {
        status: res.status,
        data: res.data,
    }
}

const doPost = (client, stream, formUploadParamName, options) => {
    const formData = new FormData()
    const formOpts = options.filename ? { filename: options.filename } : {}

    if (formUploadParamName === 'file') {
        formData.append(formUploadParamName, stream, formOpts)
    } else {
        stream.forEach(s => formData.append(formUploadParamName, s, formOpts))
    }

    return client
        .post(options.endpoint, formData, {
            headers: formData.getHeaders(),
            params: { dryRun: options.dryRun },
            onUploadProgress: options.onUploadProgress,
        })
        .then(res => formatRes(res))
}

const file = client => (stream, opts = {}) => {
    const options = validateUploadFileOpts({ stream, ...opts })
    return doPost(client, stream, 'file', options)
}

const directory = client => (streams, opts = {}) => {
    const options = validateUploadDirOpts({ streams, ...opts })
    return doPost(client, streams, 'files[]', options)
}

module.exports = client => {
    return {
        file: file(client),
        directory: directory(client),
    }
}
