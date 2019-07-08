const express = require('express');
const path = require('path');
const { argv } = require('yargs');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();

if (argv.mode === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client-dst')));

} else if (argv.mode === 'development') {
  webpackConfig.mode = 'development';
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath: webpackConfig.output.publicPath,
  }));

} else {
  throw new Error('--mode <production|development> required');
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
