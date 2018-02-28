const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, '../src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                type: 'javascript/auto',
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                type: 'javascript/auto',
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                type: 'javascript/auto',
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'main': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        },
        modules: [path.join(__dirname, '../node_modules')]
    },
    devtool: 'inline-source-map'
};