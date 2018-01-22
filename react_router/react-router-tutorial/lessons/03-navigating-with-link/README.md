### `Link` 组件的使用
* 使用 `Link`组件作为导航
* `Link`组件几乎等价于 `a` 标签
* 注意: 不能再 `Router` 组件下直接使用 `Link`

# Navigating with Link

Perhaps the most used component in your app is `Link`. It's almost
identical to the `<a/>` tag you're used to except that it's aware of
the `Router` it was rendered in.

Let's create some navigation in our `App` component.

```js
// modules/App.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
      </div>
    )
  }
})
```

Now visit [http://localhost:8080](http://localhost:8080) and click the links, click back, click
forward. It works!

---

[Next: Nested Routes](../04-nested-routes/)
