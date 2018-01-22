var React = require('react');
var ListStore = require('../stores/ListStore');
var ButtonActions = require('../actions/ButtonActions');
var MyButton = require('./MyButton');

var MyButtonController = React.createClass({
  getInitialState: function () {
    return {
      items: ListStore.getAll()
    };
  },

  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
    ListStore.addTestListener(this._onTest);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
    ListStore.removeTestListener(this._onTest);
  },

  _onChange: function () {
    this.setState({
      items: ListStore.getAll()
    });
  },

  createNewItem: function (event) {
    ButtonActions.addNewItem('new item');
  },

  _onTest: function () {
    this.setState({
      items: ListStore.getAll()
    });
  },

  createTest: function (event) {
      console.log(event);
    ButtonActions.addTest('new from test');
  },

  render: function() {
    return <MyButton
      items={this.state.items}
      onClick={this.createNewItem}
      onTest={this.createTest}
    />;
  }

});

module.exports = MyButtonController;
