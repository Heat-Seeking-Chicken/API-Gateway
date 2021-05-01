const path = require('path');

const rules = [{
  test: /\.(js|jsx|ts)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react','@babel/preset-flow'],
    plugins: ['@babel/plugin-syntax-jsx', '@babel/plugin-transform-runtime'],
    }
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }
];

module.exports = {
  mode: 'development',
  entry : path.resolve(__dirname, './client/index.js'),
  output:{
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    publicPath: '/build',
    proxy: {
      '/': {
        target: 'http://localhost:3000/'
      },
    },
  }
}