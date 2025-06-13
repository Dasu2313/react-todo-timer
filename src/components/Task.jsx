import { useRef, useEffect, useState } from 'react'
import { compareAsc, formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task = (props) => {
  const checkboxRef = useRef(null)
  const timerIntervalRef = useRef(null)
  const [displayTime, setDisplayTime] = useState();

  useEffect(() => {
    if (props.isRunning) {
      timerIntervalRef.current = setInterval(() => {
        const now = Date.now();
        const startedAt = new Date(props.startTime).getTime();
        const elapsedSinceStart = Math.floor((now - startedAt) / 1000);

        setDisplayTime(props.elapsedTime + elapsedSinceStart);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [props.isRunning, props.elapsedTime, props.startTime]);


  const onFormSubmit = (event) => {
    event.preventDefault()

    const taskName = event.target.taskName.value
    const newTask = {
      name: taskName,
      status: 'active',
      elapsedTime: props.elapsedTime,
      isRunning: props.isRunning,
      createdAt: props.createdAt,
      startTime: props.startTime,
    }

    props.updateTasks(newTask, props.idx)
  }

  const onCheckChange = (checked) => {
    const newTask = {
      name: props.text,
      status: checked ? 'completed' : 'active',
      elapsedTime: props.elapsedTime,
      isRunning: props.isRunning,
      createdAt: props.createdAt,
      startTime: props.startTime,
    }
    props.updateTasks(newTask, props.idx)
  }

  const handlePlay = (e) => {
    e.stopPropagation();
    if (!props.isRunning) {
       props.onTimerUpdate(props.idx, { isRunning: true, startTime: new Date() });
    }
  }

  const handlePause = (e) => {
    e.stopPropagation();
    if (props.isRunning) {
      const now = Date.now();
      const startedAt = new Date(props.startTime).getTime();
      const elapsedSinceStart = Math.floor((now - startedAt) / 1000);
      const newElapsedTime = props.elapsedTime + elapsedSinceStart;
       props.onTimerUpdate(props.idx, { isRunning: false, elapsedTime: newElapsedTime, startTime: null });
    }
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <li className={props.status}>
      <div
        className="view"
      >
        <input
          onClick={(e) => e.stopPropagation()}
          ref={checkboxRef}
          className="toggle"
          type="checkbox"
          onChange={(event) => {
            onCheckChange(event.target.checked)
          }}
          checked={props.status === 'completed'}
        />
        <label>
          <span className="title">{props.text}</span>
           <span class="description">
                  <button className="icon icon-play" onClick={handlePlay}></button>
                  <button className="icon icon-pause" onClick={handlePause}></button>
                  {(displayTime > 0 || props.isRunning) && formatTime(displayTime)}
                </span>
                <span class="description">created {formatDistanceToNow(props.createdAt, { addSuffix: true, includeSeconds: true })}</span>
        </label>
        <button onClick={() => props.onEdit(props.idx)} className="icon icon-edit"></button>
        <button onClick={() => props.onDelete(props.idx)} className="icon icon-destroy"></button>

      </div>
      {props.status === 'editing' && (
        <form onSubmit={onFormSubmit}>
          <input onKeyDown={(event) => {
            if (event.key === "Escape") {
              props.onEditCancel(props.idx);
            }
          }} type="text" className="edit" name="taskName" required defaultValue={props.text}></input>
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  updateTasks: PropTypes.func.isRequired,
  onTimerUpdate: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['active', 'completed', 'editing']).isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  elapsedTime: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  startTime: PropTypes.instanceOf(Date),
}

Task.defaultProps = {
  status: 'active',
  createdAt: new Date(),
  elapsedTime: 0,
  isRunning: false,
  startTime: null,
}

export default Task
