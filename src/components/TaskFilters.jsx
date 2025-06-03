import PropTypes from 'prop-types'

const TaskFilters = (props) => {
  return (
    <ul className="filters">
      <li>
        <button
          className={props.selectedFilter === '' ? 'selected' : ''}
          onClick={() => props.onChangeFilter('')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={props.selectedFilter === 'active' ? 'selected' : ''}
          onClick={() => props.onChangeFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={props.selectedFilter === 'completed' ? 'selected' : ''}
          onClick={() => props.onChangeFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilters.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

TaskFilters.defaultProps = {
  selectedFilter: '',
}

export default TaskFilters
