const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://capstone-project-c624-ps070.firebaseio.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'firebase-realtime-db',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://firestore.googleapis.com/v1/projects/capstone-project-c624-ps070/databases/(default)/documents/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'firebase-firestore',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://firebasestorage.googleapis.com/v0/b/capstone-project-c624-ps070.appspot.com/o/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'firebase-storage',
          },
        },
      ],
    }),
  ],
};