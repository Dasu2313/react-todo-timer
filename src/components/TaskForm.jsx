import PropTypes from 'prop-types'

const TaskForm = (props) => {
  const onFormSubmit = (event) => {
    event.preventDefault()
    console.log('testsubm');

    const taskName = event.target.taskName.value
    const newTask = {
      name: taskName,
      status: 'active',
      timer: new Date(),
      timerMinutes: event.target.timerMinutes.value,
      timerSeconds: event.target.timerSeconds.value
    }

    props.updateTasks(newTask)
    event.target.taskName.value = ''
    event.target.timerMinutes.value = ''
    event.target.timerSeconds.value = ''
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="taskName"
          required
        />
        <input name="timerMinutes" className="new-todo-form__timer" placeholder="Min"/>
        <input name="timerSeconds" className="new-todo-form__timer" placeholder="Sec"/>
        <button type='submit' style={{display: 'none'}} />
      </form>
    </header>
  )
}

TaskForm.propTypes = {
  updateTasks: PropTypes.func.isRequired,
}

export default TaskForm
