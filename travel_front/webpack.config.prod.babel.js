import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base.js';

export default webpackMerge(baseConfig, {
    entry: {
        main: './src/index.jsx'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false
        })
    ]
});