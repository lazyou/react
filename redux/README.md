#### react 开发准备工具
* redux 文档中文地址 : http://cn.redux.js.org/index.html
* redux 文档英文地址 : http://redux.js.org/
* ES6 入门教程 : http://es6.ruanyifeng.com/
* ES6 转 ES5 在线工具 : http://babeljs.io/repl/#
* 中文精简教程 : https://github.com/react-guide/redux-tutorial-cn (本项目的 redux_tutorial_cn 目录)


#### 常用开发包记录
* Immutable.js (https://facebook.github.io/immutable-js/)
* redux-devtools 调试工具 (https://github.com/gaearon/redux-devtools)


#### 不懂知识点记录
* 三个点操作符 : ES7 notation (Object Spread): ...state
* Object.assign (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

### 在线执行工具 : http://jsbin.com/rapabufuze/edit?html,console
```
<!DOCTYPE html>
<html>
<head>
  <script src="//cdn.bootcss.com/redux/3.5.2/redux.min.js"></script>
</head>
<body>
<script>

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

let reducer = Redux.combineReducers({ visibilityFilter, todos })
let store = Redux.createStore(reducer)

```
