var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
    cache: true,
    entry: './src/lib/NFMusic.js',
    output: {
        path: __dirname,
        filename: './build/NFMusic.min.js',
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src/lib'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'less-loader', options: {strictMath: true, noIeCompat: true}}
                ]
            }
        ]
    },
    // babel: {
    //     babelrc: false,
    //     presets: [
    //         ['es2015'],
    //     ],
    // },
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};