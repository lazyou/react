var AppDispatcher = require('../dispatcher/AppDispatcher');

var ButtonActions = {
  addNewItem: function (text) {
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_ITEM',
      text: text
    });
  },
  addTest: function (text) {
    AppDispatcher.dispatch({
      actionType: 'TEST',
      text: text
    });
  }
};

module.exports = ButtonActions;
