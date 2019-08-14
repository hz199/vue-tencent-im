const compressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  devServer: {
    open: true,
    port: 8888,
    // proxy: {
    //   '/api': {
    //     target: `http://www.baidu.com`, // 代理后台接口地址
    //     changeOrigin: true
    //   }
    // }
  },
  // 这个参数回影响代理 调试文件
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 修改上下文作用域
  chainWebpack: (config) => {
    config.module.rule('less-loader').test(/\.less$/).end()
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          // 代码gzip压缩
          new compressionWebpackPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
            deleteOriginalAssets: false // 压缩后是否删除原文件
          })
        ]
      }
    }
  }
}
