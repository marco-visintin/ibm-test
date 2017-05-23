const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: `${__dirname}/src`,
  cache: true,
  devtool: 'inline-sourcemaps',

  entry: './index.tsx',
  
  output: {
    path: `${__dirname}/dist`,
    filename: 'app.js'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
    modules: ['node_modules']
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
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
    new HtmlWebpackPlugin({ template: `${__dirname}/src/index.template.html` }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
