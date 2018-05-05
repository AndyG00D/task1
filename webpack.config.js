const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        test: './src/index.ts',
    },
    mode: "development",
    devtool: "eval",
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        contentBase: ['./dist', './src'],
        port: 3030,
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            // {
            //     test: /\.(png|jpg|gif|woff(2)?|ttf|eot|svg)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 8192
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(css)$/,
            //     use: [{
            //         loader: "style-loader" // creates style nodes from JS strings
            //     }, {
            //         loader: "css-loader" // translates CSS into CommonJS
            //     }]
            // },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            // },

            {
            test: /\.(png|jpg|gif)$/,
            use: [
            {
                loader: 'file-loader',
                options: {}
            }
            ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)?$/,
                    use: [{
                loader: 'file-loader',
            }]
}

        ]
    },
    resolve: {
        extensions: ['*', '.js', 'ts', 'tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Example',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack Example',
            template: './src/index.html',
            filename: 'test.html',
            chunks: ['test']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
        // new ExtractTextPlugin('main.css')
    ]
};
