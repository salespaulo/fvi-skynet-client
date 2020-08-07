'use strict'

const { Validator, Required, Default, isString, isNotEmpty } = require('fvi-js-validator')

const { DEFAULT_SKYNET_URL, DEFAULT_UPLOAD_URL, FORM_PARAM_UPLOAD_FILE } = require('../../utils')

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

module.exports = {
    validateUploadOpts: Validator(validateUploadOpts),
    validateFile: Validator(validateFile),
    validateStream: Validator(validateStream),
}
