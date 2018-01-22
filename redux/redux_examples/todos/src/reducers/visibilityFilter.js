console.log('reducers/visibilityFilter.js');

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    console.log('visibilityFilter state :');
    console.log(state);
    console.log('visibilityFilter action :');
    console.log(action);

  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
