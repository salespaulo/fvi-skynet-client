'use strict'

const {
    Validator,
    Required,
    Default,
    isString,
    isInteger,
    isMin,
    isNotEmpty,
} = require('fvi-js-validator')

const {
    DEFAULT_SKYNET_URL,
    DEFAULT_UPLOAD_URL,
    DEFAULT_DOWNLOAD_URL,
    FORM_PARAM_UPLOAD_FILE,
} = require('../../utils')

const validateFile = {
    name: Required([isString(), isNotEmpty()]),
    webkitRelativePath: [isString()], // impls fvi-validate-js isPath
}

const validateStream = {
    pipe: Required([isNotEmpty()]),
}

const validateUploadOpts = {
    file: [isNotEmpty()],
    files: [isNotEmpty()],
    stream: [isNotEmpty()],
    streams: [isNotEmpty()],
    baseUrl: Default(DEFAULT_SKYNET_URL, [isString(), isNotEmpty()]),
    endpoint: Default(DEFAULT_UPLOAD_URL, [isString(), isNotEmpty()]),
    filename: [isString(), isNotEmpty()],
    formParam: Default(FORM_PARAM_UPLOAD_FILE, [isString(), isNotEmpty()]),
    onUploadProgress: [isNotEmpty()],
}

const validateUploadResponse = {
    status: Required([isInteger(), isMin(200)]),
    data: [isNotEmpty()],
}

const validateDownloadOpts = {
    skylink: Required([isString(), isNotEmpty()]),
    endpoint: Default(DEFAULT_DOWNLOAD_URL, [isString(), isNotEmpty()]),
}

const validateSkynetUrl = {
    url: Default(DEFAULT_SKYNET_URL, [isString(), isNotEmpty()]),
}

module.exports = {
    validateSkynetUrl: Validator(validateSkynetUrl),
    validateUploadOpts: Validator(validateUploadOpts),
    validateDownloadOpts: Validator(validateDownloadOpts),
    validateUploadResponse: Validator(validateUploadResponse),
    validateFile: Validator(validateFile),
    validateStream: Validator(validateStream),
}
