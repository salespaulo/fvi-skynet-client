'use strict'

const FormData = require('form-data')

const { validateUploadFileOpts, validateUploadDirOpts } = require('../validation')

const formatRes = res => {
    res.data.skylink = `${SIA_URI}${res.data.skylink}`

    return {
        status: res.status,
        data: res.data,
    }
}

const doPost = (client, stream, formUploadParamName, options) => {
    const formData = new FormData()
    const formOpts = options.filename ? { filename: options.filename } : {}
    formData.append(formUploadParamName, stream, formOpts)

    return client
        .post(options.endpoint, formData, {
            headers: formData.getHeaders(),
            params: { dryRun: options.dryRun },
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
