const path = require('path'); //модуль позволяющий найти абсолютный путь до файла, чтобы при изменении адресации ничего не навернулось, у нас путь был указан динамический
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'; //здесь будет храниться инфа о том какой мод мы юзаем development или production, если dev, то будет true
const isProd = !isDev; //если не dev, тогда profuction
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}` //будет определять название файла, если isDev, то обычное название файла (name), а если нет, то название файла + contenthash. Хэш нужен для того, чтобы при сборке приложения каждый раз выдавались новые названия файлов и нам не пришлось сбрасывать кэн на сайте.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");




module.exports = {
    context: path.resolve(__dirname, 'src'),  //Пишется путь, где хранятся все ассеты, чтобы каждый раз не писать src. Можем просто написать 'src', но можем воспользоваться возможностями path модуля. dirname - это абсолютный путь до файла
    mode: 'development', //по дефолту поставим режим разработки
    entry: './js/main.js', //входная точка
    output: {  //куда все будет складываться
        filename: `./js/${filename('js')}`,  //т.е. на выходе с помощью ф-и filename определяем название файла, которое будет в dist отправлено. 
        path: path.resolve(__dirname, 'dist') //конечная точка в dist
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
        ],
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
      },
}