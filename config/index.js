const path = require('path');

module.exports = {
    dev: {
        env: 'development',
        assetsRoot: path.resolve(__dirname, '../examples/dist'),
        assetsPublicPath: '/v2-lazy-list/examples/dist/',
        contentBase: path.resolve(__dirname, '../examples/dist'),
        port: 3001
    },
    build: {
        env: 'production',
        assetsRoot: path.resolve(__dirname, '../examples/dist'),
        assetsPublicPath: '/v2-lazy-list/examples/dist/'
    }
};
