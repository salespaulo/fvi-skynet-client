'use strict'

const { Validator, Required, isString, isNotEmpty } = require('fvi-js-validator')

const URI_SIA = `sia://`
const DEFAULT_SKYNET_URL = `https://siasky.dev`
const DEFAULT_UPLOAD_URL = `/skynet/skyfile`
const DEFAULT_DOWNLOAD_URL = `/`
const FORM_PARAM_UPLOAD_FILE = 'file'
const FORM_PARAM_UPLOAD_DIR = 'files[]'
const DEFAULT_DIR_PATH = 'root'

const validatebuildSkynetUrl = Validator({
    endpoint: Required([isString(), isNotEmpty()]),
    skylink: Required([isString(), isNotEmpty]),
})

const buildSkynetUrl = (endpoint, skylink) => {
    const opts = validatebuildSkynetUrl({ endpoint, skylink })
    const isValid = opts.skylink.startsWith(URI_SIA)

    if (isValid) {
        const key = opts.skylink.slice(URI_SIA.length)
        return opts.endpoint.endsWith('/') ? `${opts.endpoint}${key}` : `${opts.endpoint}/${key}`
    }

    throw new Error(`Invalid skylink format! error=${skylink} not starts with ${URI_SIA}`)
}

const setUriSiaPrefix = skylink => {
    if (skylink && skylink.startsWith(URI_SIA)) {
        return skylink
    }
    return `${URI_SIA}${skylink}`
}

module.exports = {
    URI_SIA,
    DEFAULT_SKYNET_URL,
    DEFAULT_UPLOAD_URL,
    DEFAULT_DOWNLOAD_URL,
    DEFAULT_DIR_PATH,
    FORM_PARAM_UPLOAD_FILE,
    FORM_PARAM_UPLOAD_DIR,
    buildSkynetUrl,
    setUriSiaPrefix,
}
