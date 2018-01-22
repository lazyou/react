#### 问题
    * 弄清使用了哪些库
    * 哪个方法是由哪个库提供的 (例如 applyMiddleware() 是由 redux 提供的)


#### 缺失的包
    * isomorphic-fetch (取代XHR) 2.2.1 
    * redux-logger (Logger middleware for Redux) 2.6.1
    * redux-thunk (Thunk middleware for Redux, 也可以用 redux-promise 等代替) 2.1.0 
    * redux-actions(辅助库来生成 action creator 和 reducer)


* http://www.reddit.com/r/${subreddit}.json



#### 异步 Action Creator
    * 如何把之前定义的同步 action creator 和 网络请求结合起来呢？标准的做法是使用 Redux Thunk middleware。
    * 你只需要知道一个要点：通过使用指定的 middleware，action creator 除了返回 action 对象外还可以返回函数。这时，这个 action creator 就成为了 thunk。
    * 【重要， XHR 操作放这里】当 action creator 返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。
    * 如何在 dispatch 机制中引入 Redux Thunk middleware 的呢？我们使用了 applyMiddleware()
    * thunk 的一个优点是它的结果可以再次被 dispatch：


#### 异步数据流 
    * 默认情况下，createStore() 所创建的 Redux store 没有使用 middleware，所以只支持 同步数据流。
    * 你可以使用 applyMiddleware() 来增强 createStore()。虽然这不是必须的，但是它可以帮助你用简便的方式来描述异步的 action。