const path = require('path')
const webpack = require('webpack');
const dev =  process.env.NODE_ENV === "dev"
const WebpackCleanupPlugin= require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let baseConfiguration = {
  entry: {
    app: './js/app.ts'
  },
  mode: dev ? 'development' : 'production',
  watch: dev,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    chunkFilename: '[name].js',
  },
  resolve:{
    extensions: ['.ts', '.scss'],
    alias:{
      'core': path.resolve(__dirname, "./js")
    }
  },
  module:{
    rules:[
      {
        test:/\.ts?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.scss|.css$/,
        use: [
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin()
  ]
}

if(dev){
  baseConfiguration.plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    })
  )
}
else{
  baseConfiguration.plugins.push(
  new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
  )
}

module.exports = baseConfiguration
