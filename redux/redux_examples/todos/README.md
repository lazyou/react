### 执行流程
1. index.js -> redux的createStore()方法
2. reducers/index.js -> redux的combineReducers()方法 构造新的 store
3. react-redux 提供的 connect() :
    * http://cn.redux.js.org/docs/react-redux/api.html
    * 连接 React 组件与 Redux store
    * 只注入 dispatch, 不监听 store : `export default connect()(TodoApp);`
    * connect 有n种注入的搭配,  具体看 api


### 疑惑
1. 关于 react-redux 的生命周期,  例如 ： 触发了 `ADD_TODO` 应该只是响应了一个 dispatch(); 但是其他模块也重新渲染 render 了. 只要state任意变更所有的UI组件都会重新渲染吗?
2. [2016-11-20 18:20:29 更新疑惑] : 因为理解错 `compoments/TodoList.js` 组件, 这个组件并非直接使用, 而是 connect() 了 `container/VisibleTodoList.js`



#### 再次理解 : 2016年11月20日18:01:23
* 也许前面的分析是有错的, 应该先理解整个应用的 `Store Tree`, 然后再来理解组件怎么按照这颗数据数做拆分 (UI组件(所依附的事件) / 容器组件 / dispatch 触发等等规划)

* store tree 分析
    * `reducers/index.js` 下 `combineReducers()` 初始化了整个应用的 数据结构
    ```
    {
        todos: [
            {
                id: 0,
                text: "默认是没有这个的, 只是为了突出结构",
                completed: false,
            }
        ],
        visibilityFilter: 'SHOW_ALL'
    }
    ```

* 组件 / 事件 分析
    * 数据注入 : `index.js` 通过 `react-redux` 的 Provider 组件注入根组件

    * 根组件 (UI组件) : `compoments/App.js`
        ```
        <AddTodo />
        <VisibleTodoList />
        <Footer />
        ```

    * 输入框 (容器组件) : `containers/AddTodo.js`. 
        * `connect()` 自身, 底下没有UI组件
        * `onSubmit 事件` => {type: 'ADD_TODO', id: 0, text: 'xxx'}.
     
    * todo列表显示 (容器组件) : `containers/VisibleTodoList.js`.  
        * `connect()` 了UI组件 `compoments/TodoList.js`.
        * 这里是容器组件动态计算得到 UI组件所需的数据, 所以为什么切换过滤条件会自动调整 TodoList 界面的数据
        * 注意: 过滤条件变更仅仅是对 state.todos 的二次处理后**新的 todos** 传入 UI组件, 并没有改变整个应用 state 里的 todos.  
        * Array.prototype.filter() : filter() 方法使用指定的函数测试所有元素, 并创建一个包含所有通过测试的元素的**新数组**. 
        * 需要理解 `VisibleTodoList.js` 里下面的代码:
        ```js
        // mapStateToProps会订阅 Store, 每当state更新的时候, 就会自动执行, 重新计算 UI 组件的参数, 从而触发 UI 组件的重新渲染 . 
        // 参考 ： http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
        const mapStateToProps = (state) => ({
            todos: getVisibleTodos(state.todos, state.visibilityFilter)
        })

        const mapDispatchToProps =  ({
            onTodoClick: toggleTodo
        })

        const VisibleTodoList = connect(
            mapStateToProps,
            mapDispatchToProps
        )(TodoList)
        ```
            * `compoments/TodoList.js`, 接收了 `todos, onTodoClick` 两个 props, 遍历传到下一个组件 单条 todo 显示组件 `compoments/Todo.js`        
                * 单条 todo 显示 / 完成状态切换 (UI组件) :  `compoments/Todo.js`, 属于 TodoList.js 的子组件. `onClick事件` => {type: 'TOGGLE_TODO', id: 0}.
    
    * 底部显示 (UI组件) : `compoments/Footer.js`
        * 子组件是容器组件 `containers/FilterLink.js`. 
        * 并 connect() 到 UI组件 `compoments/Link.js`
        * 理解 `containers/FilterLink.js` 的如下代码, 重要
        * 理解 ownProps 的由来 : 从 `compoments/Link.js` 的 `<FilterLink filter="SHOW_ALL">` 传进来
        ```
        // 使用 ownProps 作为参数后, 如果容器组件的参数发生变化, 也会引发 UI 组件重新渲染
        // 参考 ： http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
        // 注意: 这里 ownProps 就是从 <FilterLink filter="SHOW_ALL"> 的时候传进来的 
        const mapStateToProps = (state, ownProps) => ({
            active: ownProps.filter === state.visibilityFilter
        })

        const mapDispatchToProps = (dispatch, ownProps) => ({
            onClick: () => {
                dispatch(setVisibilityFilter(ownProps.filter))
            }
        })

        const FilterLink = connect(
            mapStateToProps,
            mapDispatchToProps
        )(Link)

        export default FilterLink       
        ```
        * 过滤切换 (UI组件) : `compoments/Link.js`, 属于 Footer.js 的子组件. `onClick事件` => {type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL'}.
        
    * 每一个 Action 的触发都会使应用由上(根组件)而下重新渲染一遍

* 难点 -- [同时也是最重要的点]
    * Array.prototype.filter() : filter() 方法使用指定的函数测试所有元素, 并创建一个包含所有通过测试的元素的**新数组**. 
    * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

    * React-Redux 提供connect方法, 用于从 UI 组件生成容器组件
        * http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
        * 案例: 
        ```
        import { connect } from 'react-redux'
        const VisibleTodoList = connect()(TodoList)

        // 上面代码中, TodoList是 UI 组件, VisibleTodoList就是由 React-Redux 通过connect方法自动生成的容器组件 .

        // 但是, 因为没有定义业务逻辑, 上面这个容器组件毫无意义, 只是 UI 组件的一个单纯的包装层 .为了定义业务逻辑, 需要给出下面两方面的信息 .
         (1) 输入逻辑：外部的数据 (即state对象) 如何转换为 UI 组件的参数
         (2) 输出逻辑：用户发出的动作如何变为 Action 对象, 从 UI 组件传出去 .
        因此, connect方法的完整 API 如下 .

        import { connect } from 'react-redux'

        const VisibleTodoList = connect(
            mapStateToProps,
            mapDispatchToProps
        )(TodoList)

        上面代码中, connect方法接受两个参数：mapStateToProps 和 mapDispatchToProps .
        它们定义了 UI 组件的业务逻辑 .
        前者负责输入逻辑, 即将state映射到 UI 组件的参数 (props) .
        后者负责输出逻辑, 即将用户对 UI 组件的操作映射成 Action .
        ```



### 对再次理解的简述
* 知道整个应用的 state 在什么时候被改变很重要. 也就是被 `dispatch()` 的时候.
* **UI组件** 和 **容器组件** 的区别, 以及联合.
* `react-redux` 提供的 `connect()` 方法是用于联合 **UI组件** 和 **容器组件**, 一定要理解透这个方法. 
* `connect()` 连接 React 组件与 Redux store, 提供了哪些 **UI组件**. 


* http://cn.redux.js.org/docs/react-redux/api.html
    * 在多个组件上使用 connect(), 每个组件只监听它所关联的部分 state.
    * <Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store. 正常情况下, 你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法. 
    * 情况太多种了, 需要参考 api

* 理解 connect() 参数 mapStateToProps 和 mapDispatchToProps 的参数 :
    * 参考: http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
    * mapStateToProps 会订阅 Store, 每当state更新的时候, 就会自动执行, 重新计算 UI 组件的参数, 从而触发 UI 组件的重新渲染. 
    * mapStateToProps 的第一个参数总是state对象, 还可以使用第二个参数, 代表容器组件的props对象. 
    * 使用 ownProps 作为参数后, 如果容器组件的参数发生变化, 也会引发 UI 组件重新渲染. 
    * connect() 可以省略 mapStateToProps 参数, 那样的话, UI 组件就不会订阅Store, 就是说 Store 的更新不会引起 UI 组件的更新. 
    * mapDispatchToProps 的参数如果是一个object的话，里面的每个函数都会被当做一个action creator，因此这个对象上的每个函数都会用dispatch包一层，然后传给props，因此你看到的props上的onTodoClick其实是已经有dispatch了. (https://segmentfault.com/q/1010000007546163?_ea=1379226)

# Redux Todos Example

This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
