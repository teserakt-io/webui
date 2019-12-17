/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet')
const next = require('next');
var fs = require('fs');
var http = require('http');
var https = require('https');
var accesslog = require('./utils/accesslog');

require('dotenv').config();

const devProxy = {
    '/c2': {
        target: process.env.C2_URL,
        pathRewrite: { '^/c2': '' },
        changeOrigin: true,
        secure: process.env.C2_SECURE_CNX === 'true',
    }
};

if (process.env.AE_ENABLED === 'true') {
    devProxy['/ae'] = {
        target: process.env.AE_URL,
        pathRewrite: { '^/ae': '' },
        changeOrigin: true,
        secure: process.env.AE_SECURE_CNX === 'true',
    };
}

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
    dir: '.',
    dev
});

const handle = app.getRequestHandler();

let log_file;
if (!dev) {
    log_file = fs.createWriteStream('/var/log/e4_webui.log', { flags: 'w' });
}

let server;
app
    .prepare()
    .then(() => {
        server = express();

        server.use(helmet());

        // Extra security headers not provided by helmet:
        server.use((req, res, next) => {
            res.setHeader('Referrer-Policy', 'no-referrer');
            res.setHeader('Feature-Policy', "layout-animations 'none'; unoptimized-images 'none'; oversized-images 'none'; sync-script 'none'; sync-xhr 'none'; unsized-media 'none'");
            next();
        });

        // Configure CSP
        let directives = {}
        directives.scriptSrc = ["'self'"];

        if (dev) {
            directives.scriptSrc = ["'self'", "'unsafe-eval'", "'unsafe-inline'"]; // unsafe-* for hot reload stuff on dev server
            directives.reportUri = '/report-violation'
        }

        server.use(helmet.contentSecurityPolicy({
            directives: directives,
        }));

        // Set up the proxy.
        if (devProxy) {
            const proxyMiddleware = require('http-proxy-middleware');
            Object.keys(devProxy).forEach(function (context) {
                server.use(proxyMiddleware(context, devProxy[context]))
            })
        }

        if (dev) {
            // Debug CSP violations
            var bodyParser = require('body-parser')
            server.use(bodyParser.json({
                type: ['json', 'application/csp-report']
            }))
            server.post('/report-violation', (req, res) => {
                if (req.body) {
                    console.log('CSP Violation: ', req.body)
                } else {
                    console.log('CSP Violation: No data received!')
                }

                res.status(204).end()
            })
        }

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all('*', (req, res) => {
            accesslog(req, res, function (data) {
                data["application"] = "webui";
                log = JSON.stringify(data);
                if (!dev) {
                    log_file.write(log + '\n');
                }
                console.log(log);
            });
            handle(req, res)
        });

        let httpServer;
        if (process.env.HTTPS_ENABLED === 'true') {
            console.log("> starting https server using cert " + process.env.HTTPS_CERTIFICATE + " and key " + process.env.HTTPS_CERTIFICATE_KEY)
            var privateKey = fs.readFileSync(process.env.HTTPS_CERTIFICATE_KEY, 'utf8');
            var certificate = fs.readFileSync(process.env.HTTPS_CERTIFICATE, 'utf8');
            var credentials = { key: privateKey, cert: certificate };
            httpServer = https.createServer(credentials, server);
        } else {
            console.log("> starting http server")
            httpServer = http.createServer(server);
        }

        httpServer.listen(port, "0.0.0.0", err => {
            if (err) {
                throw err
            }
            console.log(`> Ready on port ${port} [${env}]`)
        })
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server');
        console.log(err)
    });
