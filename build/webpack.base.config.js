const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = require('../config');

const env = process.env.NODE_ENV || 'development';

console.log('---------env------:', env);

module.exports = {
    context: path.resolve(__dirname, '../examples'),
    mode: env,
    module: {
        rules: [
            {
                test: /\.vue$/,
                type: 'javascript/auto',
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                type: 'javascript/auto',
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'tpl.html',
            filename: 'index.html',
            inject: true,
            env: process.env.NODE_ENV,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            }
        }),

        new ProgressBarPlugin()
    ]
};
