
* `webpack` 生成编译后js文件在 builds 目录下。

#### 理解这个项目 
* http://cn.redux.js.org/docs/basics/UsageWithReact.html
* 完整代码 http://cn.redux.js.org/docs/basics/ExampleTodoList.html

* 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components） 
    | 	                | 容器组件	                | 展示组件           |
    |-------------------|-------------------------|--------------------|
    | Location	        | 最顶层，路由处理	         | 中间和子组件         |
    | Aware of Redux	| 是	                      | 否                 |
    | 读取数据	         | 从 Redux 获取 state	      | 从 props 获取数据   |
    | 修改数据	         | 向 Redux 派发 actions	  | 从 props 调用回调函数 |



#### 设计组件层次结构 
* 设计组件。
* 设计 state tree。
* 以下的这些组件（和它们的 props ）就是从这个设计里来的：
    * AdTodo 输入字段的输入框和按钮。
        * onAddClick(text: string) 当按钮被点击时调用的回调函数。
    * TodoList 用于显示 todos 列表。
        * todos: Array 以 { text, completed } 形式显示的 todo 项数组。
        * onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。
    * Todo 一个 todo 项。
        * text: string 显示的文本内容。
        * completed: boolean todo 项是否显示删除线。
        * onClick() 当 todo 项被点击时调用的回调函数。
    *Footer 一个允许用户改变可见 todo 过滤器的组件。
        * filter: string 当前的过滤器为： 'SHOW_ALL'、 'SHOW_COMPLETED' 或 'SHOW_ACTIVE'。
        * onFilterChange(nextFilter: string)： 当用户选择不同的过滤器时调用的回调函数。
    这些全部都是#展示组件#。它们不知道数据是从哪里来的，或者数据是怎么变化的。你传入什么，它们就渲染什么。


#### 目录结构
* 展示组件放在 `components` 目录。
* `containers` 目录集合所有展示组件。


#### 纯 react 实现


#### 连接到 redux : 【重要】 http://cn.redux.js.org/docs/basics/UsageWithReact.html 
* redux 如何结合 react:
    * `react-redux` 插件
    * 通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux, `<Provider />` 组件获取 store 数据
    * 【注意】 从技术上来说你可以将应用中的任何一个组件 connect() 到 Redux store 中，但尽量避免这么做，因为这个数据流很难追踪
    * 任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 中所需的任何内容
    * connect() 的唯一参数是 selector, 此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
    * 为了使组合 selectors 更有效率，不妨看看 reselect(https://github.com/faassen/reselect)。在这个例子中我们不会用到它，但它适合更大的应用。

* 目录结构：
    ```
    ├── builds  // webpack 编译后文件
    ├── actions // Action 和 Action 创建函数(对象，本质上是返回对象的函数), 描述了 state 的变化情况 : http://cn.redux.js.org/docs/basics/Actions.html
    │   └── TestActions.js
    ├── reducers // 纯函数(几个_永远不要在 reducer 里做这些操作_), 对 Action 描述变化情况的实现 : http://cn.redux.js.org/docs/basics/Reducers.html
    │   └── TestReducers.js
    ├── components // 展示组件
    │   ├── AddTodo.js
    │   ├── Footer.js
    │   ├── Todo.js
    │   └── TodoList.js
    ├── containers // 容器组件 : store 放在这里, 分发到各个_展示组件. 所有 redux 操作(`dispatch() 、 connect()`)也放这里 : http://cn.redux.js.org/docs/basics/Store.html
    │   └── ContainApp.js
    ├── TestApp.js
    ├── index.html
    ├── package.json
    └── webpack.config.js
    ```

* 数据流: http://cn.redux.js.org/docs/basics/DataFlow.html
    * `TestApp.js` 通过 `<Provider store={store}>` 注入 `store` 到 _容器组件_ `ContainApp.js`
    * `ContainApp.js` 通过 `connect()` 注入所需 `store` 到 _展示组件_ 
    * _展示组件_ 通过 `props(属性)` 传入 `dispatch()` 方法触发 `TestReducers.js` 从而由上而下更新数据

* 与纯 react 区别 :
    * 无需赋值初始化数据, 通过 connect() 注入
    * 无需 setState({}), 数据变更自动 setState()

* 问题:
    * ajax 放哪里?
    * `export default connect(select)(ContainApp)` 方法看不懂。
