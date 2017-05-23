const path = require('path')

const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')

const pkg = require('./package.json')

module.exports = {
  target: 'web',
  stats: 'errors-only',
  cache: false,
  context: `${__dirname}/src`,

  entry: {
    app: './index.tsx',
    vendors: Object.keys(pkg.dependencies)
  },

  output: {
    path: `${__dirname}/dist`,
    filename: 'app.js'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [`${__dirname}/src`],
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendors'],
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      output: {
        comments: false
      },
      sourceMap: true
    }),

    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }),

    new HtmlWebpackPlugin({
      template: './index.template.html'
    }),

    new webpack.optimize.AggressiveMergingPlugin(),
    new WebpackCleanupPlugin(),
    new webpack.SourceMapDevToolPlugin({
      test: [/\.js$/],
      exclude: ['vendors'],
      filename: '[name].[chunkhash].js.map',
      column: false
    })
  ]
}
