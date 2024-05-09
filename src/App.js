import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  // Function for add task
  const addTask = (task) => {
    console.log('Add task:', task);
  };

  return (
    <React.Fragment>
      <TaskForm onAddTask={addTask} /> {}
      <TaskList />
    </React.Fragment>
  );
}

export default App;
