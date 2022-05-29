const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UnicodeWebpackPlugin = require('./src/plugin/UnicodeWebpackPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
 
const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './index.js'), //打包入口文件路径
    output: {
      path: path.join(__dirname, './dist'), //输出文件路径
      filename: 'static/js/[name].[contenthash:8].js', //把生成的bundle.js放在dist/js/bundle.js下面
      chunkFilename:'static/js/[name].[contenthash:8].chunk.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,    // 排除 node_modules 文件夹
          use: {
            loader: 'babel-loader', // babel-loader  babel-loader处理JSX语法的。
            options: {
              babelrc: true,
  
              presets: ['@babel/preset-react', '@babel/preset-env'],
              cacheDirectory: true
            }
          }
        },
        {
            test: /\.css$/,
            use:[MiniCssExtractPlugin.loader,'css-loader']
        }
      ]
    },
    plugins: [
      new UnicodeWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: 'public/index.html',
        filename: 'index.html'
      }),
    
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new CssMinimizerPlugin(),
      new CopyPlugin({
        patterns: [
         
          { from: "./public/mock", to: "./mock" },
        ] 
      })
    ]
  

} 


