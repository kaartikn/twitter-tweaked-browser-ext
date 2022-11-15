const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup.jsx',
    background: './src/background.js',
    content: './src/content.js',
    script: './src/script.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
    { 
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]]
          }
      }
    },
    {
      test: /\.(scss|sass|css)$/,
      use: [ 'style-loader', 'css-loader', 'postcss-loader','sass-loader']
    }],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: { 
             ascii_only: true 
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/popup.html',
        filename: 'popup.html'
  }),
  new CopyPlugin({
    patterns: [
      { from: "public" }
    ],
  }),
],
};