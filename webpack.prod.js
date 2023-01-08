const path = require('path');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new WebpackPwaManifest({
      publicPath: '.',
      filename: 'app.webmanifest',
      id: 'mytime-pwa-1',
      start_url: './index.html',
      name: 'My Time App',
      short_name: 'My Time',
      description: 'Find Restaurant In Your Place',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#203541',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/icon/logo.png'),
          destination: path.join('images/icon'),
          sizes: [96, 128, 144, 192, 256, 384, 512],
          purpose: 'maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/images/icon/logo.png'),
          destination: path.join('images/icon'),
          sizes: [96, 128, 144, 192, 256, 384, 512],
          purpose: 'any',
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
    }),
  ],
});
