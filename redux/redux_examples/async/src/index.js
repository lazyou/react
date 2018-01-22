import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]
// 如果不是生产环境就把 Logger 也加入到中间件
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了
// 中间件顺序要注意, logger就一定要放在最后，否则输出结果会不正确
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
// 上面代码使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数
// 因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch

// applyMiddleware(
//     thunk, // 允许我们 dispatch() 函数
//     createLogger // 一个很便捷的 middleware，用来打印 action 日志
//   )

console.log('redux 根据 reducers 构造出来的应用数据结构 state : ')
console.log('然而这个数据结构未必代表 react当中用到的属性props, App 组件接收到的属性是通过 connect() 结合 mapStateToProps() 再次处理后的结构 : ')
console.log(store.getState())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
