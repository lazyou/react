* 项目地址 : https://github.com/kisnows/react-v2ex
* 运行 : `npm run dev` 后根据提示访问 url
* webpack 涉及: jsx编译、 es6转换、 scss编译、 图片压缩 (参考 webpack.config.js)
* `npm run` 时设置不同的 `NODE_ENV=production`
* XHR 放在 `componentDidMount` 处理, 并使用了 `Promise`.


#### 问题
* 项目中 `npm run dev` 后 `index.html` 引用了 ``<script src="/static/bundle.js"></script>`` , 但是没看到 `static` 目录.
* 理解项目中的 `Promise` 的使用
    ```js
    function get(url) {
        return new Promise(function (resolve,reject) {
            var xhr = new XMLHttpRequest
            xhr.open('GET', url, true)
            xhr.responseType = 'json'
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send(null)
            xhr.onreadystatechange = function () {
                if(this.readyState !== 4){
                    return
                }
                if(this.status === 200){
                    resolve(this.response)
                }else{
                    reject(this.status)
                }
            }
        })
    }

    export { get }
    ```


#react-v2ex
[![Build Status](https://travis-ci.org/kisnows/react-v2ex.svg?branch=master)](https://travis-ci.org/kisnows/react-v2ex)
[![Code Climate](https://codeclimate.com/github/kisnows/react-v2ex/badges/gpa.svg)](https://codeclimate.com/github/kisnows/react-v2ex)

用于熟悉 `react` 而搭建的 [v2ex](https://v2ex.com) 首页。
#license
MIT
