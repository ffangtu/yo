const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        https:false,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    configureWebpack: config => {
        if (isProduction) {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            config.plugins.push(new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
        }
    }
}