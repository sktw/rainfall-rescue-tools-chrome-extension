const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'contentScript.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
        {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'eslint-loader'
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {from: 'src/manifest.json', to: '.'},
            {from: 'src/contentScript.css', to: '.'},
            {from: 'src/icons', to: './icons'}
        ], 
        {
            copyUnmodified: true
        })
    ]
}
