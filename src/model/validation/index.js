'use strict'

const joi = require('@hapi/joi')

const {
    DEFAULT_SKYNET_URL,
    DEFAULT_UPLOAD_URL,
    DEFAULT_DOWNLOAD_URL,
    FORM_PARAM_UPLOAD_DIR,
    FORM_PARAM_UPLOAD_FILE,
    throwsIfInvalidJoiSchema,
} = require('../../utils')

const validateFile = joi
    .object({
        name: joi.string().required(),
        path: joi.string(),
        webkitRelativePath: joi.string(),
    })
    .options({ stripUnknown: true })
    .xor('path', 'webkitRelativePath')

const validateStream = joi.object({ pipe: joi.func().required() }).options({ stripUnknown: true })

const validateUploadOpts = joi
    .object({
        file: validateFile,
        files: joi.array().items(validateFile.required()).optional(),
        stream: validateStream,
        streams: joi.array().items(validateStream.required()),
        baseUrl: joi.string().uri().required(),
        endpoint: joi.string().optional().default(DEFAULT_UPLOAD_URL),
        filename: joi.string().optional(),
        formParam: joi
            .string()
            .valid(FORM_PARAM_UPLOAD_FILE, FORM_PARAM_UPLOAD_DIR)
            .optional()
            .default(FORM_PARAM_UPLOAD_FILE),
        onUploadProgress: joi.func().optional(),
    })
    .options({ stripUnknown: true })
    .xor('file', 'files', 'stream', 'streams')

const validateUploadResponse = joi
    .object({
        status: joi.number().min(200).required(),
        data: joi.object({ skylink: joi.string().required() }).required(),
    })
    .options({ stripUnknown: true })
    .required()

const validateDownloadOpts = joi.object({
    skylink: joi.string().required(),
    endpoint: joi.string().optional().default(DEFAULT_DOWNLOAD_URL),
})

const validateSkynetUrl = joi.string().default(DEFAULT_SKYNET_URL)

module.exports = {
    validateSkynetUrl: throwsIfInvalidJoiSchema(validateSkynetUrl),
    validateUploadOpts: throwsIfInvalidJoiSchema(validateUploadOpts),
    validateDownloadOpts: throwsIfInvalidJoiSchema(validateDownloadOpts),
    validateUploadResponse: throwsIfInvalidJoiSchema(validateUploadResponse),
}
