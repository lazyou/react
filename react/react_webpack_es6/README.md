参考：
http://uraway.hatenablog.com/entry/2015/12/25/Webpack_%2B_React_%2B_ES6%E3%81%AE%E6%9C%80%E5%B0%8F%E6%A7%8B%E6%88%90%E3%82%92%E8%80%83%E3%81%88%E3%81%A6%E3%81%BF%E3%82%8B%E3%80%82

https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html


cnpm init 生成 package.json

基本node包：
$ cnpm install --save react react-dom // 原文少了 react-dom
$ cnpm install --save webpack
$ cnpm install webpack-dev-server -g // 暂时部安装。感觉这个可以不用


es6转换：
$ cnpm install --save babel-loader babel-core babel-preset-react babel-preset-es2015


以上包安装记录会写入 package.json 中。


1. 应用目录结构：
webpack-react
  |___index.html
  |___hello.jsx
  |___world.jsx
  |___main.js
  |___webpack.config.js
  |___package.json


2. index.html:
```
见文件
```

2. hello.jsx:
```
见文件
```

3. world.jsx:
```
见文件
```

4. webpack配置：
main.js: 入口文件 entry
```
  import Hello from './hello.jsx'
  import World from './world.jsx'
```

webpack.config.js： 配置文件
```
  var path = require('path');
  var webpack = require('webpack');

  module.exports = {
    entry: './main.js',
    output: { path: __dirname, filename: 'bundle.js' },
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }
  }
```

运行 `webpack` 生成打包、转换后的文件 bundle.js.
```
webpack 转换一次
webpack --watch 实时监听文件变化转换
webpack-p(压缩混淆需要配合 UglifyJsPlugin 插件)
```

webpack配置文件介绍： http://www.html-js.com/article/2931
```
webpack.config.js
entry：指定打包的入口文件，每有一个键值对，就是一个入口文件
output：配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称，filename里面的[name]会由entry中的键（这里是entry1和entry2）替换
resolve：定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
module：定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。比如这里定义了凡是.js结尾的文件都是用babel-loader做处理，而.jsx结尾的文件会先经过jsx-loader处理，然后经过babel-loader处理。当然这些loader也需要通过npm install安装
plugins: 这里定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取出公用的部分，生成common.js
```

webpack插件介绍： http://rhadow.github.io/2015/05/30/webpack-loaders-and-plugins/
```
```

5. end： 思考 webpack-dev-server 的作用
