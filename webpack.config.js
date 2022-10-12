/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const { join, resolve } = require('path');
const { ProgressPlugin } = require('webpack');

module.exports = {
  entry: {
    background: './src/entries/background/index.ts',
    contentscript: './src/entries/content/index.ts',
    popup: './src/entries/popup/index.ts',
    inpage: './src/entries/inpage/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vanilla\.css$/i, // Targets only CSS files generated by vanilla-extract
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              url: false, // Required as image imports should be handled via JS/TS import statements
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({ allowEmptyValues: true }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      template: './src/entries/popup/index.html',
      filename: 'popup.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static', to: './' }],
    }),
    new MiniCssExtractPlugin(),
    new ProgressPlugin(),
    new VanillaExtractPlugin(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, 'build'),
  },
};
