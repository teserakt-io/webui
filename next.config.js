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
    // Don't put sensible stuff in here, this is sent to browsers in __NEXT_DATA__
    publicRuntimeConfig: {
        C2_URL: process.env.C2_URL,
        MQTT_URL: process.env.MQTT_URL,
        AE_ENABLED: process.env.AE_ENABLED,
        AE_URL: process.env.AE_URL,
    },
}));
