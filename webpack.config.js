var path =require('path');

var ROOT_PATH = path.resolve(__dirname);//根目录
var APP_PATH = path.resolve(ROOT_PATH,'src');//代码目录
var BUILD_PATH = path.resolve(ROOT_PATH,'build');//webpack 打包目录

var glob = require('glob');

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
    },
    //babel
    module: {
        rules: [
            //css babel
            {
                test: /\.(css|scss|less)$/,
                loaders: ['style-loader','css-loader']
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
}