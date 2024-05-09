import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  // Функция для добавления задачи
  const addTask = (task) => {
    // Реализация логики добавления задачи
    console.log('Добавляем задачу:', task);
  };

  return (
    <React.Fragment>
      <TaskForm onAddTask={addTask} /> {/* Передаем функцию addTask в качестве пропса */}
      <TaskList />
    </React.Fragment>
  );
}

export default App;
