import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack_config from '../webpack.config.dev';

const isDeveloping = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 8000;
const server = express();

// Security HTTP
server.disable('x-powered-by');
server.set('port', port);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(hpp());
server.use(helmet.xssFilter());
server.use(helmet.frameguard('deny'));
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());
server.use(cookieParser());
server.use(compression());

server.use(favicon(
    path.join(__dirname.split('server')[0],
        'public',
        'favicon.ico'
    )
));

if (isDeveloping) {
    const compiler = webpack(webpack_config);
    server.use(morgan('dev'));
    server.use(webpackMiddleware(compiler, {
        publicPath: webpack_config.output.publicPath,
        contentBase: 'src',
        hot: true,
        stats: {
            colors: true,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: true,
            modules: false,
        }
    }));
    server.use(webpackHotMiddleware(compiler, {
        log: console.log,
    }));
} else {
    server.use(morgan('combined'));
    server.use('/build/static', express.static(buildPath));
}

server.get('*', (req, res) => {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname.split('server')[0], 'public', 'index.html'));
});

server.listen(port, '0.0.0.0', (err) => {
    if (err) throw err;

    console.info('==> 🌎 Server listening on port %s.' +
        'Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
export default server
