/**
 * Created by coffee on 08/02/2017.
 */

var path = require("path"),
    fs = require("fs");

function readEntryModule(entryPath) {

    var entry = {};
    entryPath = entryPath || "src/";

    fs.readdirSync(entryPath)
        .forEach(function (_path) {

            // 第一层路径的文件
            if( fs.statSync(entryPath+_path).isFile() && [".ts", ".js"].indexOf(path.extname(entryPath + _path)) !== -1 ){
                entry[path.parse(_path).name] = entryPath + _path;
            }

            // 首字母大写的目录视为一个模块，然后寻找模块的入口文件( index.ts, index.js, modalName.ts, modalName.js )
            else if( fs.statSync(entryPath+_path).isDirectory() && _path[0] >= "A" && _path[0] <= "Z" ){

                var entryFilePath = "";

                var maybeList = [
                    "index.ts",
                    "index.js",
                    _path + ".ts",
                    _path + ".js"
                ];

                maybeList.every(function (fileName) {
                    var filePath = path.join(entryPath, _path, fileName);

                    if(fs.existsSync(filePath)){
                        entryFilePath = filePath;
                    }

                    return !fs.existsSync(filePath);
                });

                if(entryFilePath){
                    entry[_path] = path.resolve(entryFilePath);
                }
            }

        });

    return entry;
}

module.exports = {

    entry: readEntryModule(),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "build"),
        publicPath: "/build/"
    },

    module: {
        loaders: [
            {
                test: /\.js|/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.ts/,
                loaders: ["ts-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                loaders: ["url-loader?limit=50000"]
            }
        ]
    },

    watch: true,

    devtool: "inline-source-map",

    devServer: {
        contentBase: path.join(__dirname),
        compress: false,
        host: "0.0.0.0",
        port: 9000
    }

};