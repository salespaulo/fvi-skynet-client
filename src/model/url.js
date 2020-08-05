'use strict'

const { validateSkynetUrl } = require('./validation')

module.exports = (opts = {}) => validateSkynetUrl(opts)
