const webpack = require('webpack');
const withSass = require('@zeit/next-sass')
module.exports = withSass({
    webpack: config => {
        return config;
    },
});