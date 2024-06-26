const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: './index.js',
    output: {
        filename: "bundle.[hash:8].js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@core": path.resolve(__dirname, "src/core")
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist")
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
            }
        ],
    },
}