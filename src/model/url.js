'use strict'

const { validateSkynetUrl } = require('./validation')

module.exports = skylink => validateSkynetUrl({ url: skylink }).url
