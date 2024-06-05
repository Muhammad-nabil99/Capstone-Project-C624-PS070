const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { GenerateSW } = require('workbox-webpack-plugin');

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
    new GenerateSW({
      swDest: path.resolve(__dirname, 'dist/sw.js'),
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:js|css|html|json|png|jpg|jpeg|svg|gif)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources',
          },
        },
        {
          urlPattern: new RegExp('^https://api.mapbox.com/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'mapbox-api',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
      ],
    }),
  ],
});
