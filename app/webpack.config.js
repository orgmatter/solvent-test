const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve('crypto-browserify')
        }
    },
    plugins: [
        new NodePolyfillPlugin()
    ]
}