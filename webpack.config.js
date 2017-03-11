var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
    cache: true,
    entry: './src/lib/NFPlayer.js',
    output: {
        path: __dirname,
        filename: './build/NFPlayer.min.js',
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
            },
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
        ]
    }
};