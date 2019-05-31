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
        return config
    }
}));
// module.exports = withCss(withSass({
//     webpack:(config, options) => {
//         // console.log(options.defaultLoaders);
//         // config.module.rules.push({
//         //     test: /\.css$/,
//         //     use: options.defaultLoaders.sass
//         // });
//         // console.log(config.module.rules);
//         return config;
//     }
// }));