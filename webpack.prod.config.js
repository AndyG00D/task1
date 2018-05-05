const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[hash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].[contenthash].js'
    },
    mode: "production",
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [ 'css-loader' ]
                    })
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
           new ExtractTextPlugin({
                    filename: '[name].css'
                }),

        new webpack.optimize.AggressiveSplittingPlugin(),
        new CopyWebpackPlugin([
            {from: __dirname + '/src/assets', to: './assets'}
        ]),
        extractSass,

        new HtmlWebpackPlugin({
            title: 'Webpack Example',
            template: './src/index.html'
        }),
    ]
};

