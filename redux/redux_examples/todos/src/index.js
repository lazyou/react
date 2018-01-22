console.log('index.js');

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

/* createStore() 第二个参数可以整个应用的默认值
const store = createStore(reducer,     {
        todos: [
            {
                id: 0,
                text: "默认是没有这个的, 只是为了突出结构",
                completed: false,
            }
        ],
        visibilityFilter: 'SHOW_ALL'
    })
*/

// 初始化数据 : Object {todos: Array[0], visibilityFilter: "SHOW_ALL"}
console.log('index.js 应用数据初始化:');
console.log(store.getState());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
