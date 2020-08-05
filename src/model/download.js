'use strict'

const { validateDownloadOpts } = require('./validation')

module.exports = (opts = {}) => validateDownloadOpts(opts)
