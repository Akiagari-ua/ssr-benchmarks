const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

const serverEntries = glob.sync('./src/benchmark/**/*.ts').reduce((acc, file) => {
  const entryName = path.relative('./src/benchmark', file).replace(/\.ts$/, '');
  acc[entryName] = file;
  return acc;
}, {});

module.exports = [
  {
    mode: process.env.NODE_ENV || 'production',
    entry: serverEntries,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/benchmark/**/*'),
            to: path.resolve(__dirname, 'dist/[path][name][ext]'),
            context: path.resolve(__dirname, 'src/benchmark'),
            globOptions: {
              ignore: ['**/*.ts'],
            },
          },
        ],
      }),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    devtool: 'source-map',
  },
  {
    mode: process.env.NODE_ENV || 'production',
    entry: {
      chart: './src/benchmark/client/chart.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: '[name].js',
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css', // Название файла для CSS
      }),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devtool: 'source-map',
  },
];