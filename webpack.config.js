const path = require('path')
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.pug$/i,
                loader: 'pug-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader"
                ],
            },
            {
                test: /\.css$/,
                use: [
                  "style-loader",
                  "css-loader"
                ]
            }
        ]
    },

    plugins: [
        ...glob.sync(`./src/pages/*`).map(page => new HtmlWebpackPlugin({
            template: page,
            filename: `pages/${path.basename(page, path.extname(page))}.html`
        })),
        new CleanWebpackPlugin(),
    ],
}