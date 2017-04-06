// jscs:disable
const path = require("path");
const webpack = require("webpack");
const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        bundle: [
            "./src/index.js"
        ],
        vendor: [
            "react",
            "react-dom"
        ]
    },
    output: {
        path: path.join(__dirname, "build/public"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        publicPath: "/build/public/"
    },
    plugins: [
        OccurrenceOrderPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: 2
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
            "__DEV__": true
        })
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
                test: /\.svg$/,
                use: 'url-loader'
            }
        ]
    }
};
