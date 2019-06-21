require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
module.exports = withSass(withCss({
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        });

        config.plugins = config.plugins || []
        config.plugins = [
            ...config.plugins,
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ];

        return config
    },
    publicRuntimeConfig: {
        ...process.env,
    },
}));