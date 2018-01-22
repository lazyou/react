

### react+redux教程（一）connect、applyMiddleware、thunk、webpackHotMiddleware
* http://www.cnblogs.com/lewis617/p/5145073.html
* 运行 `npm run start`


### 教程内容
* 组件 : `components/Counter.js`
    * 从props中导入变量和方法
    * 渲染组件

* 容器 : `containers/App.js`
    * `redux` 流程 : 组件 <-----> action -----> reducer -----> state -----> 组件(回到起点)
    * `state` 就是数据, 组件就是数据的呈现形式, `action` 是动作, `action` 是通过 `reducer` 来更新 `state` 的
    * 把 state的 counter 值绑定到 props 上
    * 把四个 `action 创建函数` 绑定到 props 上
    * `connect` : 那么为什么就绑定上去了呢？因为有connect这个方法. 【重要】
        1. 第一个参数，必须是 function，作用是绑定 state 的指定值到 props 上面。这里绑定的是counter
        2. 第二个参数，可以是 function，也可以是对象，作用是绑定 action 创建函数到 props上。
        3. 返回值，是绑定后的组件

* action和reducer两个好基友负责更新state : `actions/counter.js` && `reducers/counter.js` && `reducers/index.js`
    * 写了四个 action 创建函数
    * 写了 reducer 用于更新 state
    * 将所有 reducer (这里只有一个)打包成一个 reducer

* 注册store : `store/configureStore.js` && `index.js` 【没看懂 `configureStore`】
    * 用中间件使 action创建函数 可以返回一个 function 代替一个 action对象
    * 如果在热替换状态（Webpack hot module replacement）下，允许替换reducer
    * 导出 store
    * 将 store 放进 provider
    * 将 provider 放在组件顶层，并渲染

* applyMiddleware、thunk
    * applyMiddleware 来自redux可以包装 store 的 dispatch()
    * thunk 作用使 action 创建函数可以返回一个 function 代替一个 action对象

* 服务 : `server.js` && `webpack.config.js`
    * npm start 后执行node server ，触发webpack。webpack插件功能如下：
        1. OccurenceOrderPlugin的作用是给经常使用的模块分配最小长度的id。
        2. HotModuleReplacementPlugin是热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境。
        3. NoErrorsPlugin用于保证编译后的代码永远是对的，因为不对的话会自动停掉。
