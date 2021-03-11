const webpack =require('webpack')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://100.82.255.11:8080/',
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