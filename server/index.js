import fs from 'fs';
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
import webpack_production from '../webpack.config.prod';

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
let assets;
if (isDeveloping) {
    const compiler = webpack(webpack_config);
    assets = {
        vendor: {js: '/build/public/vendor.js'},
        bundle: {js: '/build/public/bundle.js'}
    };
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
    server.use('/build/public', express.static(webpack_production.output.path));
    fs.readFile('assets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        assets = JSON.parse(data);
    });
}

server.use('/public', express.static(path.join(
    __dirname.split('server')[0],
    'public'
)));

const renderPage = (assets) => {
    return `<!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${assets.vendor.css ? `<link rel="stylesheet" href="${assets.vendor.css}"/>` : ''}
            ${assets.bundle.css ? `<link rel="stylesheet" href="${assets.bundle.css}"/>` : ''}
            <!--
              Notice the use of %PUBLIC_URL% in the tag above.
              It will be replaced with the URL of the 'public' folder during the build.
              Only files inside the 'public' folder can be referenced from the HTML.
    
              Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
              work correctly both with client-side routing and a non-root public URL.
              Learn how to configure a non-root public URL by running 'npm run build'.
            -->
            <title>Social profile | CodeRockr</title>
        </head>
        <body>
            <div id="root"></div>
            <!--
              This HTML file is a string template.
              If you open it directly in the browser, you will see an empty page.
    
              You can add webfonts, meta tags, or analytics to this file.
              The build step will place the bundled scripts into the <body> tag.
    
              To begin the development, run 'npm start'.
              To create a production bundle, use 'npm run build'.
              To run app into production, use 'npm run production'.
            -->
            <script>
                window.INITIAL_STATE = {
                    title: 'CodeRockr social-profiles',
                    subtitle: 'Welcome! Just enjoy'
                };
                window.DEVELOPMENT = ${isDeveloping}
            </script>
            <script src="${assets.vendor.js}"></script>
            <script src="${assets.bundle.js}"></script>
        </body>
    </html>`
};

server.get('*', (req, res) => {
    res.status(200).send(renderPage(assets));
});

server.listen(port, '0.0.0.0', (err) => {
    if (err) throw err;

    console.info('🌎 Server listening on port %s.\n', port);
    console.log('Open up http://0.0.0.0:%s/ in your browser.\n', port);
});

export default server
