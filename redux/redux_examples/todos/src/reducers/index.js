console.log('reducers/index.js');
console.log('combineReducers() 构造新的 reducers -- 整个应用的初始数据, 配合 createStore() 到 Provider 拿去注入');

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
