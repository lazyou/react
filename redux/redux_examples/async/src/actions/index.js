export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
})

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

// 异步Action : 先后 dispatch 了两个 **同步Action**
/**
http://cn.redux.js.org/docs/advanced/AsyncActions.html : 
// 来看一下我们写的第一个 thunk action 创建函数！
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))
// 返回的函数的参数是dispatch和getState这两个 Redux 方法
// [注意] -- 异步action
 */
const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit)) // 首次 dispatch：更新应用的 state 来通知 API 请求发起了。 : REQUEST_POSTS

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。
    // 这个案例中，我们返回一个等待处理的 promise。
    // [啥意思] -- 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json))) // 可以多次 dispatch! 这里，使用 API 请求结果来更新应用的 state。  : RECEIVE_POSTS
}

// 辅助方法 : 是否有必要发起 XHR 请求
const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))  // fetchPosts(reddit) 最终返回的是一个 action创建函数, 所以在 componentDidMount 会再次被 dispatch()
  }
}
