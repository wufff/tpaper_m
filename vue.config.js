module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
     port: "8080",//代理端口
     open: true,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
     disableHostCheck: true,
     host:"0.0.0.0"
  }
      
}
