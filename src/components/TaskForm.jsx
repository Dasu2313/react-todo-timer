import PropTypes from 'prop-types'

const TaskForm = (props) => {
  const onFormSubmit = (event) => {
    event.preventDefault()

    const taskName = event.target.taskName.value
    const newTask = {
      name: taskName,
      status: 'active',
      timer: new Date(),
    }

    props.updateTasks(newTask)
    event.target.taskName.value = ''
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="taskName"
          autoFocus
          required
        />
      </form>
    </header>
  )
}

TaskForm.propTypes = {
  updateTasks: PropTypes.func.isRequired,
}

export default TaskForm
