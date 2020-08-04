'use strict'

const joi = require('@hapi/joi')

const {
    DEFAULT_SKYNET_URL,
    DEFAULT_UPLOAD_URL,
    DEFAULT_DOWNLOAD_URL,
    throwsIfInvalidJoiSchema,
} = require('../utils')

const validateUploadFileOpts = joi.object({
    stream: joi.object({ pipe: joi.func().required() }).required().options({ stripUnknown: true }),
    endpoint: joi.string().optional().default('/skynet/skyfile'),
    filename: joi.string().optional().default(null),
    dryRun: joi.boolean().optional().default(true),
    onUploadProgress: joi.func().optional().default(null),
})

const validateUploadDirOpts = joi.object({
    streams: joi
        .array()
        .items(
            joi.object({ pipe: joi.func().required() }).required().options({ stripUnknown: true })
        )
        .required(),
    endpoint: joi.string().optional().default(DEFAULT_UPLOAD_URL),
    filename: joi.string().optional(),
    dryRun: joi.boolean().optional().default(true),
    onUploadProgress: joi.func().optional().default(null),
})

const validateDownloadOpts = joi.object({
    skylink: joi.string().required(),
    endpoint: joi.string().optional().default(DEFAULT_DOWNLOAD_URL),
})

const validateSkynetUrl = joi.string().optional().default(DEFAULT_SKYNET_URL)

module.exports = {
    validateSkynetUrl: throwsIfInvalidJoiSchema(validateSkynetUrl),
    validateDownloadOpts: throwsIfInvalidJoiSchema(validateDownloadOpts),
    validateUploadFileOpts: throwsIfInvalidJoiSchema(validateUploadFileOpts),
    validateUploadDirOpts: throwsIfInvalidJoiSchema(validateUploadDirOpts),
}
