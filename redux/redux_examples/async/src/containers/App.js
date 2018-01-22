import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
      super()
      console.log('constructor')
      console.log(this.state)
      console.log(this.props)
  }

  // 默认数据初始化只能放在组件的 componentDidMount 方法, react 的生命周期
  componentDidMount() {
    // console.log('从服务器拉取初始化数据到 redux 的 state 里. (redux 的state 已经有完整的应用数据结构了)')
    // console.log('App componentDidMount : ')
    // console.log(this.state)
    // console.log(this.props)
    const { dispatch, selectedReddit } = this.props
    // fetchPostsIfNeeded 当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行
    let fetch_result = fetchPostsIfNeeded(selectedReddit); // 结果是一个 **action创建函数**
    console.log('fetch_result')
    console.log(fetch_result)
    dispatch(fetch_result)  // thunk 的一个优点是它的结果可以再次被 dispatch. 前提是要返回一个 action ? 这里返回一个 dispatch() 也会被 dispatch ?
  }

  componentWillReceiveProps(nextProps) {
    console.log('App componentWillReceiveProps : ')
    console.log(nextProps)
    
    // fetch 数据的时候执行了 dispatch(requestPosts(reddit)) , 还会再到这里, 所以需要判断 之前选择的下拉框值 和 现在选择的下拉框值 是否一致, 不一致才需要发起ajax请求
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  // 下拉变更
  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    // 根组件做了不同 ajax 状态时的处理, 
    // 首次加载 Loading
    // 刷新当前页面 (列表透明度)
    // 下拉框切换 Loading
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

// 对应用的 state 再次整理然后一一对应到 App组件当中
const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
