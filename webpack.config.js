var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin= require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: '',
    filename: "main.js",
  },
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    port: 1233,
    overlay: true, //for errors
    writeToDisk: true,
    open:true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              publicPath: '../',
            },
          },
          "css-loader"],
      },
      {
        test: /\.(|svg|jpe?g|gif|png)$/,       
         use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "images",
            }
          }
        ]
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "fonts",
              esModule: false,
            }
          }
        ]
      },
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({filename: "css/style.css"}),
    new OptimizeCSSAssetsPlugin ({}),
  ],
};