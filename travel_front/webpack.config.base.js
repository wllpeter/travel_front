import path from 'path';
import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const STATIC_PATH = 'static';
const extractStyle = new ExtractTextPlugin(`${STATIC_PATH}/assets/css/[contenthash].style.css`);
const extractMTUI = new ExtractTextPlugin(`${STATIC_PATH}/assets/css/[contenthash].mtui.css`);
const extractAntd = new ExtractTextPlugin(`${STATIC_PATH}/assets/css/[contenthash].antd.css`);

export default {
    // 入口文件配置
    entry: {
        main: './src/index_dev.jsx',
        commons: ['react', 'react-dom', 'react-router'],
        vendors: ['redux', 'redux-thunk', 'react-router-redux']
    },
    // 页面输入文件配置
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: `${STATIC_PATH}/assets/js/[chunkhash]_[name].js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'src'),
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)/,
                include: [
                    path.join(__dirname, 'node_modules/_mtui@2.4.56@mtui')
                ],
                use: extractMTUI.extract(['css-loader', 'postcss-loader', 'sass-loader'])
            },
            {
                test: /\.(css|scss)$/,
                include: path.join(__dirname, 'src'),
                use: extractStyle.extract(['css-loader', 'postcss-loader', 'sass-loader'])
            },
            {
                test: /\.less$/,
                include: path.join(__dirname, 'node_modules/_antd@2.13.11@antd'),
                use: extractAntd.extract(['css-loader', 'postcss-loader', 'less-loader'])
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'node_modules/_antd@2.13.11@antd/lib'),
                use: extractAntd.extract(['css-loader', 'postcss-loader'])
            },
            {
                test: /\.(woff|eot|ttf|svg)(\?t=[\s\S]+)?$/,
                include: path.join(__dirname, 'src/assets/iconfonts'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${STATIC_PATH}/assets/fonts/[hash].[ext]`
                        }
                    }
                ]
            },
            /**
             * 处理json
             */
            {
                test: /\.json$/,
                include: [
                    path.join(__dirname, 'src')
                ],
                use: [{
                    loader: 'json-loader'
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                include: path.join(__dirname, 'src/assets/images'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${STATIC_PATH}/assets/images/[hash].[ext]`
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractMTUI,
        extractAntd,
        extractStyle,
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['commons', 'vendors', 'main']
        }),
        new webpack.LoaderOptionsPlugin({
            miniminze: true,
            options: {
                postcss: function() {
                    return [precss, autoprefixer];
                }
            }
        }),
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ]

}