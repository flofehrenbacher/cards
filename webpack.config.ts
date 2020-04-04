/* tslint:disable */
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import NodemonPlugin from 'nodemon-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import { ContextReplacementPlugin } from 'webpack'

export const isStartNodeMon = Boolean(process.env.START_NODEMON)

function getClientConfig() {
  return {
    name: 'cards-gui',
    entry: {
      gui: './src/gui/app.tsx',
    },
    target: 'web',
    node: {
      __dirname: true,
      fs: 'empty',
    },
    output: {
      path: path.join(__dirname, './build/gui'),
      filename: 'app.js',
    },
    resolve: {
      mainFields: ['main', 'module'],
      extensions: ['.ts', '.js', '.tsx', '.mjs'],
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { node: '12.13' },
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
                '@emotion/babel-preset-css-prop',
              ],
              cacheDirectory: true,
              babelrc: false,
            },
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    stats: isStartNodeMon ? 'errors-only' : 'normal',
    plugins: [
      ...(isStartNodeMon
        ? [
            new NodemonPlugin({
              ext: 'js,jsx,ts,tsx,scss,json',
              // -T: Use TypeScript's faster transpileModule
              exec: 'ts-node -T src/index.ts',
              watch: 'src',
              ignore: 'src/gui',
            }),
          ]
        : []),
      new HtmlWebpackPlugin({ template: 'src/gui/index.html' }),
      new FaviconsWebpackPlugin('./src/gui/cards.svg'),
      ...(process.env.ANALYZE_CLIENT_BUNDLE ? [new BundleAnalyzerPlugin()] : []),
    ],
  }
}

function getServerConfig() {
  return {
    name: 'cards',
    entry: './src/index.ts',
    target: 'node',
    node: {
      __dirname: true,
      fs: 'empty',
    },
    output: {
      path: path.join(__dirname, './build'),
      filename: 'index.js',
    },
    resolve: {
      mainFields: ['main', 'module'],
      extensions: ['.ts', '.js', '.mjs'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: '12.13',
                    },
                  },
                ],
                '@babel/preset-typescript',
              ],
              cacheDirectory: true,
              babelrc: false,
            },
          },
        },
      ],
    },
    // suppress any promise webpack warning
    // see: https://github.com/kevinbeaty/any-promise/issues/31
    plugins: [new ContextReplacementPlugin(/any-promise/)],
    stats: 'normal',
  }
}

export default [getClientConfig(), !isStartNodeMon && getServerConfig()].filter(Boolean)
