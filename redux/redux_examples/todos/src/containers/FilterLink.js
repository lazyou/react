import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

// 使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。  参考 ： http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
