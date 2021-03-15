const webpack =require('webpack')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://100.82.65.183:8080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                jquery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
}