/* eslint-disable no-console */
const express = require('express');
const next = require('next');
var fs = require('fs');
var http = require('http');
var https = require('https');
var accesslog = require('access-log');

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
    dir: '.', // base directory where everything is, could move to src later
    dev
});

const handle = app.getRequestHandler();

let server;
app
    .prepare()
    .then(() => {
        server = express();

        // Set up the proxy.
        if (devProxy) {
            const proxyMiddleware = require('http-proxy-middleware');
            Object.keys(devProxy).forEach(function (context) {
                server.use(proxyMiddleware(context, devProxy[context]))
            })
        }

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all('*', (req, res) => {
            accesslog(req, res);
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

        httpServer.listen(port, err => {
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
