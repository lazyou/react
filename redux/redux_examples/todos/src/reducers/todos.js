console.log('reducers/todos.js');

// 注意这里 todo() 只是 todos 的一个辅助方法而已
// reducers/index.js 种只 combineReducers() 了 todos() 和 visibilityFilter() 两个 reducers
const todo = (state, action) => {
    console.log('todo state :');
    console.log(state);
    console.log('todo action :');
    console.log(action);

  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

// console.log(todo); // todo 转 ES5 写法
/*
todo 转 ES5 写法
var todo = function todo(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return _extends({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};
*/

const todos = (state = [], action) => {
    console.log('todos state :');
    console.log(state);
    console.log('todos action :');
    console.log(action);

  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

// console.log(todos); // todos 转 ES5 写法
/*
todos 转 ES5 写法
var todos = function todos() {
 var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
 var action = arguments[1];

 switch (action.type) {
   case 'ADD_TODO':
     return [].concat(_toConsumableArray(state), [todo(undefined, action)]);
   case 'TOGGLE_TODO':
     return state.map(function (t) {
       return todo(t, action);
     });
   default:
     return state;
 }
};
*/

export default todos
