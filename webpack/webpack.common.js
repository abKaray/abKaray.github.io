const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
// const postcssPresetEnv = require('postcss-preset-env')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: true,
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      stage: 0,
                      features: {
                        'logical-properties-and-values': false,
                        'prefers-color-scheme-query': false,
                        'gap-properties': false,
                        'custom-properties': false,
                        'dir-pseudo-class': false,
                        'focus-within-pseudo-class': false,
                        'focus-visible-pseudo-class': false,
                        'color-functional-notation': false,
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
        },
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: 'asset/source',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
    ],
  },
}
