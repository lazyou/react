

### react+redux教程（二）redux 的单一状态树完全替代了 react 的状态机？
* 当然不是
* http://www.cnblogs.com/lewis617/p/5147445.html
* 运行 `npm run start`

### 教程内容
* redux 的单一状态树 【没有代替】 react 的状态机
    * App组件没有state
    * Header组件没有state
    * MainSection组件【有】state
    * TodoItem组件【有】state
    * Footer组件没有state


* 何时用react组件的state、props？
    * 从上面的截图我们可以发现，state只应用了两个功能：
        1. 列表的过滤功能，即完成、未完成、全部的选择
        2. 每一项的编辑与查看功能，即双击每一项，即可进入编辑状态

    * 有此我们可以得出结论，state只表示一些"临时的""内部的"状态数据。
        * 临时的，代表你可以临时改变这个数据，比如显示完成、未完成、全部的任务，这都是临时的状态，还有任务处于编辑状态或者查看状态都是临时的。
        * 内部的，代表如果你的数据只需要在这一个组件中使用，那么你应该使用组件的内部状态。

    * props 则正好相反，它通常存储一些方法，一些可能需要存库的长期数据和一些需要传递和共享的数据。
        * 比如App组件中的todos代表任务数组，actions代表一些操作的方法，这些我们都存进了props中。
        * 还有Footer组件中的activeCount以及completedCount都是长期存在的数据，而且可能不止一个组件在使用。


* 对比Redux的全局唯一的state
    * 我们在开发工具上查看全局唯一状态树，发现是个todos数组。对应的是长期数据（并不一定要求是长期数据）和用于在多个组件中共享的数据。


* 再看redux+react流程
    * redux和react两个搭档之间，基本只有两种联系：
        * react从redux的state读取数据
        * react能dispatch分发actions到redux，redux的reducer来返回一个新的state

    * react组件就像是个婴儿，redux就像是奶妈：
        * 婴儿饿了，哭着要要奶喝，就是dispatch actions的过程
        * 奶妈准备好给婴儿喂奶就是，react从redux的state读取数据的过程

### 结论：redux的state和react组件的state没有半毛钱关系
    * 现在我们知道 redux的state装得是全局的，长期数据（并不一定要求是长期数据）也就是对应`props的数据``。
    * 而react组件的state，官方建议不要放这类数据，而应该是临时的内部状态数据。
    * 所以两个state没有半毛钱关系！



### react+redux教程（三）reduce()、filter()、map()、some()、every()、...展开属性
* reduce()、filter()、map()、some()、every()、...展开属性, 这些概念属于es5、es6中的语法，跟react+redux并没有什么联系.
* 我们直接在https://developer.mozilla.org/en-US/ 这里可以搜索到相关api文档。

* reduce() : 遍历数组，在每一项元素后面触发一个回调函数，经过计算返回一个累加的值。
    ```js
    components/MainSection.js 62行

    const completedCount = todos.reduce((count, todo) =>
        todo.completed ? count + 1 : count,
        0
    )
    ```

* filter() : 遍历数组，在每一项元素后面触发一个回调函数，通过判断，保留或移除当前项，最后返回一个新数组。
    ```js
    reducers/todos.js 24行
    return state.filter(todo =>
        todo.id !== action.id
    )
    ```

* map() : 遍历数组，在每一项元素后面触发一个回调函数，通过计算，返回一个新的当前项，最后返回一个新数组。
    ```js
    reducers/todos.js 29行

    return state.map(todo =>
        todo.id === action.id ?
            Object.assign({}, todo, { text: action.text }) :
            todo
    )
    ```

* some()、every() :  遍历数组，在每一项元素后面触发一个回调函数，通过判断，返回一个布尔值。
    * some()是只要有一个满足判断，就返回true，
    * every()是只要有一项不满足判断，就返回false。
    ```js
    components/MainSection.js  19 行
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)    
    ```

    ```js
    reducers/todos.js 43行
    const areAllMarked = state.every(todo => todo.completed)
    ```

* ...展开属性 : 
    ```js
    reducers/todos.js 20行

    return [
        {
            id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: action.text
        }, 
        ...state
    ]    


    components/MainSection.js  72 行 -- 展开state数组的每一项到当前的数组. 展开actions的每一个属性到组件中，最后在props上可以获取到。

    <TodoItem key={todo.id} todo={todo} {...actions} />
    ```
