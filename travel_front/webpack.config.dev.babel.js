import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base.js';
import devConfig from './src/config/config.dev';

const env = process.env;
const HOST = env.HOST || env.npm_package_config_host;
const PORT = env.PORT || env.npm_package_config_port;

export default webpackMerge(baseConfig, {
    entry: {
        main: './src/index_dev.jsx'
    },
    devtool: 'cheap-source-map',
    plugins: [
        // 出错不终止插件
        new webpack.NoEmitOnErrorsPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ],
    devServer: {
        host: HOST,
        port: PORT,
        inline: true,
        proxy: {
            '/dev/api/*': { // /dev/api/表示当前项目请求的key
                target: 'http://192.168.1.87:8091', // 代理服务器路径
                pathRewrite: {'^/dev/api': ''}, // 重写路径
                changeOrigin: true
            }
        },
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build')
    }
});