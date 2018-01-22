### 关键
* 异步action :
理解 : dispatch(fetchPostsIfNeeded(selectedReddit))
```
根组件 App.js 调用异步action :
    componentDidMount() {
        const { dispatch, selectedReddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }


actions/idnex.js 异步 action : 
    const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit))
        }
    }

    const shouldFetchPosts = (state, reddit) => {
        const posts = state.postsByReddit[reddit]
        if (!posts) {
            return true
        }
        if (posts.isFetching) {
            return false
        }
        return posts.didInvalidate
    }

    const fetchPosts = reddit => dispatch => {
        dispatch(requestPosts(reddit))
        return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)))
    }

### 重要点注意

1. fetchPostsIfNeeded 最终返回值是一个 **action创建函数**
* 主要是代码 function 嵌套太多层了导致没能在开始阅读项目的时候就发现 fetchPostsIfNeeded 最终返回值是一个 action创建函数.
* 所以难点也是在这里, 异步创建函数最后的返回值要注意, 是个 **action创建函数** || **action对象**
```js
componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    // fetchPostsIfNeeded 当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行
    dispatch(fetchPostsIfNeeded(selectedReddit))
}
```

2. ES6 const 声明变量 : 
* const 声明创建一个只读的常量。这不意味着常量指向的值不可变，而是变量标识符的值只能赋值一次。
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const



### 回归重点 -- `middleware` 中间件做了什么? `redux-thunk` 做了什么?
* 参考 : http://cn.redux.js.org/docs/api/applyMiddleware.html
* 中间件: 
    * Middleware 只是包装了 store 的 dispatch 方法. 技术上讲，任何 middleware 能做的事情，都可能通过手动包装 dispatch 调用来实现，但是放在同一个地方统一管理会使整个项目的扩展变的容易得多. 
    * Middleware 可以让你**包装 store 的 dispatch 方法**来达到你想要的目的.
    * middleware 还拥有“可组合”这一关键特性. 多个 middleware 可以被组合到一起使用，形成 middleware 链
    * Middleware 并不需要和 createStore 绑在一起使用，也不是 Redux 架构的基础组成部分，但它带来的益处让我们认为有必要在 Redux 核心中包含对它的支持
    * 虽然不同的 middleware 可能在易用性和用法上有所不同，它仍被作为**扩展 dispatch 的唯一标准的方式**

    > ### `...middlewares (arguments)`: 遵循 Redux middleware API 的函数.       
    > 每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函   数.      
    > 该函数会被传入 被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收    action 的新函数，这个函数可以直接调用 `next(action)`，或者在其他需要的时刻调用，甚至根本不去调用它.      
    > 调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借   此结束调用链.      
    > 所以，middleware 的函数签名是 `({ getState, dispatch }) => next => action`.         


* 例如 : redux-thunk
    * redux-thunk 支持 dispatch function，以此让 action creator 控制反转
    * 被 dispatch 的 function 会**接收 dispatch 作为参数**，并且可以**异步调用**它。这类的 function 就称为 thunk**

* 例如 :  redux-promise
    * 支持 dispatch 一个异步的 Promise action，并且在 Promise resolve 后可以 dispatch 一个普通的 action。




# Redux Async Example

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

