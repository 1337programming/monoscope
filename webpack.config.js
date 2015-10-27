module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: __dirname + '/public',
    filename: 'scripts.js'
  },
  module: {
    loaders: [
      {
        test: /masonry-layout/,
        loader: 'imports?define=>false&this=>window'
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};
