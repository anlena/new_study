const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  // outputDir: '../docs',
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir:"android",
  indexPath:"index_android.html",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    open: true,
    // 设置代理
    proxy: {
      "/api": {
        // target: "http://192.168.18.3:6081/pmmc", // 域名
        target: "http://11.12.110.39:6081/pmmc", // 测试
        // target: "http://11.12.84.142:8085/pmmc", // 域名
        // ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          '/api': '/api'
        }
      },
      "/soc": {
        // target: "http://11.12.84.107", // 域名
        // target: "http://192.168.9.173:8080", // 测试
        target: "http://11.12.110.39/pmmc/", // 域名
        // ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          '/soc': '/soc'
        }
      }
    }
  }
};
