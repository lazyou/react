var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ListStore = assign({}, EventEmitter.prototype, {
  items: [],

  getAll: function () {
    return this.items;
  },

  //
  addNewItem: function (text) {
    this.items.push(text);
  },

  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },
 
  addTest: function (text) {
    // this.items.push(text);
    this.items.push('text');
  },

  emitTest: function () {
    this.emit('test');
  },

  addTestListener: function(callback) {
    this.on('test', callback);
  },

  removeTestListener: function(callback) {
    this.removeListener('test', callback);
  }
});

module.exports = ListStore;
