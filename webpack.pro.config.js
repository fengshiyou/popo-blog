var path =require('path');
const webpack = require("webpack");
var ROOT_PATH = path.resolve(__dirname);//根目录
var APP_PATH = path.resolve(ROOT_PATH,'src');//代码目录
var BUILD_PATH = path.resolve(ROOT_PATH,'build');//webpack 打包目录
const extractTextPlugin = require("extract-text-webpack-plugin");// css分离


var glob = require('glob');
//@todo 整理 代码压缩
const uglify = require('uglifyjs-webpack-plugin');
//@todo 整理 代码压缩成zip
var ZipPlugin = require('zip-webpack-plugin');

function getEntry() {
    var entry = {};
    glob.sync(__dirname + "/src/*.js").forEach(function (file) {
        var name = file.match(/([^/]+?)\.js/)[1];
        entry[name] = __dirname + "/src/" + name + ".js";
    });
    return entry;
}

//webpack 核心配置
module.exports = {
    entry: getEntry(),
    output: {
        path: BUILD_PATH,
        publicPath: '/build/', //这个特别重要   要不不能识别热打包路径
        filename: 'js/[name].bundle.js', //打包之后输出的文件名  js(目录)[name]（entry中的名字）[hash]（就是随机一个hash码）
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    },
    //babel
    module: {
        rules: [
            {
                test: /\.build\.js$/,
                loader: 'bundle-loader',
                include:path.join(__dirname, 'src'),
                options: {
                    lazy: true,
                    name: '[name]'
                }
            },
            //css babel
            {
                test: /\.(css|scss|less)$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            //js babel
            {
                test: /\.js?$/,
                loader: "babel-loader",
                include: APP_PATH, //指定文件夹
                exclude: /node_modules/ //排除文件夹
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
        compress: true, // 启用Gzip压缩
        historyApiFallback: true, // 为404页启用多个路径
        hot: true, // 模块热更新，配置HotModuleReplacementPlugin
        https: false, // 适用于ssl安全证书网站
        noInfo: true, // 只在热加载错误和警告
        // ...
    },
    plugins: [
        //@todo 整理 用于压缩js文件
        new uglify(),
        new extractTextPlugin("/css/index.css"),  //@todo css分离 /css/index.css是分离后的路径位置
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ]
}