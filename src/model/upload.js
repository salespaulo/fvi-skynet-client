'use strict'

const path = require('path')
const parse = require('url-parse')
const FormData = require('form-data')

const { validateUploadOpts } = require('./validation')
const { FORM_PARAM_UPLOAD_FILE, FORM_PARAM_UPLOAD_DIR, DEFAULT_DIR_PATH } = require('../utils')

const createUploadUrl = (baseUrl, endpoint, filename) => {
    const parsed = parse(baseUrl)

    parsed.set('pathname', endpoint)
    if (filename) parsed.set('query', { filename })

    return parsed.toString()
}

// FIX: Node not implements WebAPI new File([], path.join(file.path, file.name)) //
const transformToFile = file => file

const getFilePath = file => file.webkitRelativePath || file.path || file.name

const getRelativeFilePath = file => {
    const filePath = getFilePath(file)
    const { root, dir, base } = path.parse(filePath)
    const relative = path.normalize(dir).slice(root.length).split(path.sep).slice(1)

    return path.join(...relative, base)
}

module.exports = (opts = {}) => {
    const skynetUpload = validateUploadOpts(opts)

    const uploadUrl = createUploadUrl(
        skynetUpload.baseUrl,
        skynetUpload.endpoint,
        skynetUpload.filename
    )

    const uploadForm = new FormData()
    const formParam = skynetUpload.formParam

    if (formParam === FORM_PARAM_UPLOAD_FILE && skynetUpload.stream != null) {
        uploadForm.append(formParam, opts.stream)
    }

    if (formParam === FORM_PARAM_UPLOAD_FILE && skynetUpload.file != null) {
        const formValue = transformToFile(opts.file)
        uploadForm.append(formParam, formValue)
    }

    if (formParam === FORM_PARAM_UPLOAD_DIR && skynetUpload.streams != null) {
        opts.streams.forEach(stream => {
            const streamPath = getRelativeFilePath(stream)
            uploadForm.append(
                formParam,
                stream,
                streamPath ? path.dirname(streamPath) : DEFAULT_DIR_PATH
            )
        })
    }

    if (formParam === FORM_PARAM_UPLOAD_DIR && skynetUpload.files != null) {
        opts.files.forEach(f => uploadForm.append(formParam, transformToFile(f), f.path))
    }

    return {
        url: uploadUrl,
        form: uploadForm,
        ...skynetUpload,
    }
}
