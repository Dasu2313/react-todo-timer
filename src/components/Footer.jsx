import PropTypes from 'prop-types'

import TaskFilters from './TaskFilters'

const Footer = (props) => {
  return (
    <footer className="footer">
      <span className="todo-count">{props.tasks.length} items left</span>
      <TaskFilters selectedFilter={props.selectedFilter} onChangeFilter={props.onChangeFilter} />
      <button className="clear-completed" onClick={() => props.onDelete()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      timer: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  selectedFilter: '',
}

export default Footer
