var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var ListStore = require('../stores/ListStore');

// 分配 action
AppDispatcher.register(function (action) {
console.log(action);
  switch(action.actionType) {
    case 'ADD_NEW_ITEM':
      ListStore.addNewItem(action.text);
      ListStore.emitChange();
      break;
    case 'TEST':
      ListStore.addTest(action.text);
      ListStore.emitTest();
      break;
    default:
      // no op
  }
})

module.exports = AppDispatcher;
