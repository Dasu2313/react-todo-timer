import PropTypes from 'prop-types'

const TaskList = ({ children }) => {
  return <ul className="todo-list">{children}</ul>
}

TaskList.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TaskList
