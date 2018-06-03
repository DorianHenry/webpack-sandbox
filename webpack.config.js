const path = require('path')
const webpack = require('webpack');
const dev =  process.env.NODE_ENV === 'dev'
const WebpackCleanupPlugin= require('webpack-cleanup-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let cssLoaders = [
    MiniCssExtractPlugin.loader,
    {
    loader: 'css-loader',
    options: {
     importLoaders: 1,
     minimize: !dev
    }
  }
]
if (!dev){
  cssLoaders.push({
      loader: 'postcss-loader',
      options: {
        plugins: (loader) => [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'ie > 8']
          }),
        ]
      }
  })
}
let scssLoaders = [
  ...cssLoaders,
  'sass-loader'
]
let baseConfiguration = {
  entry: {
    app: path.resolve('./assets/js/app.ts')
  },
  mode: dev ? 'development' : 'production',
  watch: dev,
  output: {
    path: path.resolve(__dirname, './public/assets/'),
    filename: dev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: '[name].js',
    publicPath: 'assets/'
  },
  resolve:{
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css',],
    alias:{
      '@core': path.resolve(__dirname, './assets/js/'),
      '@css': path.resolve(__dirname, './assets/css/')
    }
  },
  optimization: {
    minimizer: []
  },
  module:{
    rules:[
      {
        test:/\.(ts|tsx)?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: cssLoaders
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: scssLoaders
      }
    ]
  },
  devServer: {
    contentBase: 'public/',
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: dev ? '[name].css' : '[name].[chunkhash:8].css',
      chunkFilename: dev ? '[id].css' : '[id].[chunkhash:8].css',
    })
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
  baseConfiguration.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({}),
    new ManifestPlugin()
  )
  baseConfiguration.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  )
}

module.exports = baseConfiguration
