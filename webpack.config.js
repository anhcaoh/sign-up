const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    output: {
        path: path.resolve(__dirname, "build")
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: "url-loader",
                options: {
                    limit: 100000
                }
            },
            {
              test: /\.s[ac]ss$/,
              use: ["style-loader", "css-loader", "sass-loader"]
            }
          ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, "src/components/"),
            Features: path.resolve(__dirname, "src/Features/"),
            Src: path.resolve(__dirname, "src/"),
            Scss: path.resolve(__dirname, "src/scss/"),
            Store: path.resolve(__dirname, "src/store/"),
            Static: path.resolve(__dirname, "src/static/"),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new ESLintPlugin()
    ]
};