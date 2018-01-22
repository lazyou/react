import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

// todos 根据 visibilityFilter 再次过滤并返回新的数组给 UI 组件 去渲染(并非修改了整个应用的 state) 
const getVisibleTodos = (todos, filter) => {
    console.log('getVisibleTodos todos');
    console.log(todos);
    console.log('getVisibleTodos filter');
    console.log(filter);
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。 
// 参考 ： http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

// 为什么 这里没有使用 distpach() ? 而 FilterLink.js 的 mapDispatchToProps 使用了 dispatch() ?
// 参考 : https://segmentfault.com/q/1010000007546163?_ea=1379226
// mapDispatchToProps的参数如果是一个object的话，里面的每个函数都会被当做一个action creator，因此这个对象上的每个函数都会用dispatch包一层，然后传给props，因此你看到的props上的onTodoClick其实是已经有dispatch了
const mapDispatchToProps =  ({
  onTodoClick: toggleTodo
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
