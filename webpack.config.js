const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dinner.js"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    publicPath: "/dist/",
    host: "local.iwashibowl.net",
    port: 9000,
    open: false
  },
  resolve: {
    extensions: [".js"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  }
}
