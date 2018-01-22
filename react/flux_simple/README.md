### 【个人理解：】 flux太繁琐， action 和 dispatcher要写太多东西，连store也要继承EventEmitter，根组件 index.jsx 的代码也是繁琐。。。 不建议使用!!!

 辅助理解： http://andyyou.logdown.com/posts/241839-flux-notes

 *** 什麼是 Flux
- 再一次我们说 Flux 是 Facebook 内部搭配 React 使用的一种架构，一种设计模式。它不是一个 Framework 或 Library 。
- 它单纯是一种新的架构用来搭配补充 React 以及其单向资料流的概念。
- 然而我们也知道 Facebook 有提供一个 Dispatcher 的函式库。这个 Dispatcher 是一个全域的发佈/订阅处理函式库，他可以广播 payload (实际资料) 到被注册的 callback 回呼函式。
- 一个典型的 Flux 架构将会使用这个 Dispatcher 函式库配合 Nodejs 的 EventEmitter 模组来达成设置一个事件系统以协助管理应用程式的状态。 【表示不理解，为什么只用PubSub不行么？】
- 如果用另一个角度来说那就是 Dispatcher 其实就只是处理事件的注册与广播，概念上我们可以先理解为一个 Pub/Sub 机制，各自把自己需求的事件注册到这个管理中心，接着如果广播触发某一事件的时候
- 所有对应的事件都要被执行，而实际实作面就是透过 EventEmitter 来完成，想看实际的程式码大概就是如下:
```
 var EventEmitter = require('events').EventEmitter,
     person = new EventEmitter();

 person.on('speak', function() {
   console.log('I am here');
 });

 person.emit('speak');
```

Actions - 辅助函式 Helper methods, 单纯只是便利我们将资料传给 Dispatcher
Dispatcher - 接收 Actions 以及广播 payloads 到被注册的回呼函式(callback)
Stores - 应用程式状态和处理逻辑(即那些被注册到 Dispatcher 的回呼函式)的容器，
Controller Views - 一般来说就是那些负责管理 State ，把状态透过 props 往下传递到子元件的 React 元件



### 阮一峰flux入门教程

**flux入门教程：** http://www.ruanyifeng.com/blog/2016/01/flux.html  
**flux官网：** https://facebook.github.io/flux/

### package:
```shell
cnpm install --save react react-dom
cnpm install --save flux
cnpm install --save babel-loader jsx-loader
cnpm install --save object-assign webpack
```

### Flux的基本概念：
```
View： 视图层
Action（动作）：视图层发出的消息（比如mouseClick）
Dispatcher（派发器）：用来接收Actions、执行回调函数
Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面
```

```
                  | ----- Action <------|
                  |                     |
                  ↓                     |
Action ---> Dispatcher ---> Store ---> View
```

###### Flux 的最大特点，就是数据的"单向流动"：
    1. 用户访问 View
    2. View 发出用户的 Action
    3. Dispatcher 收到 Action，要求 Store 进行相应的更新
    4. Store 更新后，发出一个"change"事件
    5. View 收到"change"事件后，更新页面

### flux实现如下：  感觉 3、 4 比较重要
1. View：
    * index.jsx -> import MyButtonController.jsx(actions) -> import MyButton.jsx(促发来自Controller的函数onClick)
    * 这里采用的是 React 的 controller view(http://blog.andrewray.me/the-reactjs-controller-view-pattern/) 模式。"controller view"组件只用来保存状态，然后将其转发给子组件。


2. Action： 存放所有的Action(当然可以自己拆分actions)
    * ButtonActions.js -> import AppDispatcher.js
    * 上面代码中，ButtonActions.addNewItem方法使用AppDispatcher，把动作ADD_NEW_ITEM派发到Store。


3. Dispatcher： 登记各种Action的回调函数
    * AppDispatcher.js -> import ListStore.js
    * AppDispatcher.register()方法用来登记各种Action的回调函数
    * 上面代码中，Dispatcher收到ADD_NEW_ITEM动作，就会执行回调函数，对ListStore进行操作。
    * 记住，Dispatcher 只用来派发 Action，不应该有其他逻辑。


4. Store： 整个应用的状态, 类似MVC中的Model, 数据业务处理。
    * ListStore.js -> require('events').EventEmitter;
    * 上面代码中，ListStore.items用来保存条目，ListStore.getAll()用来读取所有条目，ListStore.emitChange()用来发出一个"change"事件。由于 Store 需要在变动后向 View 发送"change"事件，因此它必须实现事件接口。
    * 上面代码中，ListStore继承了EventEmitter.prototype，因此就能使用ListStore.on()和ListStore.emit()，来监听和触发事件了。
    Store 更新后（this.addNewItemHandler()）发出事件（this.emitChange()），表明状态已经改变。 View 监听到这个事件，就可以查询新的状态，更新页面了。
    * EventEmitter，是nodejs自带的事件支持库，借助webpack，我们可以在浏览器端使用它，assign库用于配合EventEmitter，方便集成EventEmitter到任意对象上


5. 回到View： 让它监听 Store 的 change 事件。
    * MyButtonController.jsx
    * 上面代码中，你可以看到当MyButtonController 发现 Store 发出 change 事件，就会调用 this._onChange 更新组件状态，从而触发重新渲染。

### Flux 与 PubSub 的区别？
