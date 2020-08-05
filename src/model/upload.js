'use strict'

const fs = require('fs')
const path = require('path')
const parse = require('url-parse')
const FormData = require('form-data')

const { validateUploadOpts } = require('./validation')
const { FORM_PARAM_UPLOAD_FILE, FORM_PARAM_UPLOAD_DIR } = require('../utils')

const createUploadUrl = (baseUrl, endpoint, filename) => {
    const parsed = parse(baseUrl)

    parsed.set('pathname', endpoint)
    if (filename) parsed.set('query', { filename })

    return parsed.toString()
}

const createFileReadStream = file => fs.createReadStream(path.join(file.path, file.name))

module.exports = (opts = {}) => {
    const skynetUpload = validateUploadOpts(opts)

    const uploadUrl = createUploadUrl(
        skynetUpload.baseUrl,
        skynetUpload.endpoint,
        skynetUpload.filename
    )

    const uploadForm = new FormData()
    const formParam = skynetUpload.formParam
    const formOpts = null //skynetUpload.file ? skynetUpload.file.path : null

    if (formParam === FORM_PARAM_UPLOAD_FILE && skynetUpload.stream != null) {
        uploadForm.append(formParam, opts.stream, formOpts)
    }

    if (formParam === FORM_PARAM_UPLOAD_FILE && skynetUpload.file != null) {
        const formValue = createFileReadStream(opts.file)
        uploadForm.append(formParam, formValue, formOpts)
    }

    if (formParam === FORM_PARAM_UPLOAD_DIR && skynetUpload.streams != null) {
        opts.streams.forEach(stream => uploadForm.append(formParam, stream, 'root-directory'))
    }

    if (formParam === FORM_PARAM_UPLOAD_DIR && skynetUpload.files != null) {
        opts.files.forEach(f => uploadForm.append(formParam, createFileReadStream(f), f.path))
    }

    return {
        url: uploadUrl,
        form: uploadForm,
        ...skynetUpload,
    }
}
