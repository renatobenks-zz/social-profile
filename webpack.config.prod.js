// jscs:disable
const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");
const ExtractPlugin = require("extract-text-webpack-plugin");
const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: false,
    entry: {
        bundle: [
            "./src/index.js",
            "./public/styles/index.less"
        ],
        vendor: [
            "react",
            "react-dom"
        ]
    },
    output: {
        path: path.join(__dirname, "build/public"),
        filename: "[name]_[hash].js",
        chunkFilename: "[id].chunk_[hash].js",
        publicPath: "/build/public/"
    },
    plugins: [
        OccurrenceOrderPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor_[hash].js",
            minChunks: 2
        }),
        new AssetsPlugin({filename: "assets.json"}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                screw_ie8: true,
            }
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
            "__DEV__": false,
        }),
        new ExtractPlugin("[name].css")
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, "node_modules"),
                use: "babel-loader",
                include: path.join(__dirname, "src")
            },
            {
                test: /\.(less|css)$/,
                use: ExtractPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                camelCase: true
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                minimize: true,
                                importLoaders: 1,
                                camelCase: true,
                                strictMath: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(svg|png|woff|woff2|jpg|gif)$/,
                use: "url-loader"
            }
        ]
    }
};
