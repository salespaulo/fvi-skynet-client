const pkg = require('./package.json')

module.exports = {
    mode: 'production',
    output: {
        filename: pkg.name + '.js',
        sourceMapFilename: pkg.name + '.map',
        library: pkg.name,
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    node: {
        // Polyfills and mocks to run Node.js-
        // environment code in non-Node environments.
        console: false, // boolean | "mock"
        global: true, // boolean | "mock"
        process: true, // boolean
        __filename: 'mock', // boolean | "mock"
        __dirname: 'mock', // boolean | "mock"
        Buffer: true, // boolean | "mock"
        setImmediate: true, // boolean | "mock" | "empty"
    },
}
