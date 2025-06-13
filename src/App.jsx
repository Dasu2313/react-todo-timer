import { useState, useEffect } from 'react'

import './App.css'
import Footer from './components/Footer'
import Task from './components/Task'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setfilter] = useState('')

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks).map(task => ({
        ...task,
        createdAt: new Date(task.createdAt),
        isRunning: task.isRunning || false,
        elapsedTime: task.elapsedTime || 0,
        startTime: task.startTime ? new Date(task.startTime) : null
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateTasks = (newVal, oldIdx) => {
    setTasks((prevTasks) =>
      prevTasks.map((val, idx) => {
        if (idx === oldIdx)
          return {
            ...val,
            ...newVal,
          }

        return val
      })
    )
  }

  const onTimerUpdate = (idx, { isRunning, elapsedTime, startTime }) => {
    setTasks(prevTasks =>
      prevTasks.map((task, index) => {
        if (index === idx) {
          return {
            ...task,
            isRunning: isRunning !== undefined ? isRunning : task.isRunning,
            elapsedTime: elapsedTime !== undefined ? elapsedTime : task.elapsedTime,
            startTime: startTime !== undefined ? startTime : task.startTime,
          };
        }
        return task;
      })
    );
  };

  return (
    <section className="todoapp">
      <TaskForm
        updateTasks={(task) => {
          setTasks((prevTasks) => [...prevTasks, { ...task, createdAt: new Date(), elapsedTime: 0, isRunning: false, startTime: null }])
        }}
      />
      <section className="main">
        <TaskList>
          {tasks
            .filter((val) => val.status === filter || filter === '')
            .map((val, idx) => (
              <Task
                updateTasks={updateTasks}
                onTimerUpdate={onTimerUpdate}
                idx={idx}
                onEditCancel={(key) => {
                  setTasks((prevTasks) => prevTasks.map((val, idx) => {
                    if (idx !== key) return val;

                    return {
                      ...val,
                      status: 'active'
                    };
                  }))
                }}
                onEdit={(key) => {
                  setTasks((prevTasks) =>
                    prevTasks.map((val, idx) => {
                      if (idx !== key) return val
                      return {
                        ...val,
                        status: 'editing',
                      }
                    })
                  )
                }}
                onDelete={(key) => {
                  setTasks((prevTasks) => prevTasks.filter((val, idx) => idx !== key))
                }}
                status={val.status}
                text={val.name}
                key={idx}
                createdAt={val.createdAt}
                elapsedTime={val.elapsedTime}
                isRunning={val.isRunning}
                startTime={val.startTime}
              />
            ))}
        </TaskList>
        <Footer
          onDelete={() =>
            setTasks((prevTasks) => prevTasks.filter((val) => val.status !== 'completed'))
          }
          selectedFilter={filter}
          onChangeFilter={(filter) => setfilter(filter)}
          tasks={tasks}
        />
      </section>
    </section>
  )
}

export default App
