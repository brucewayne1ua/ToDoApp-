import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Ошибка при получении задач:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks();
    }, 1000); // Обновляем список каждую секунду
    return () => clearInterval(interval);
  }, [tasks]); // Запускаем useEffect при изменении состояния tasks

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
      // Обновляем список задач после удаления
      fetchTasks();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h2 className="text-sm font-semibold leading-6 text-gray-900">{task.name}</h2> {/* Название задачи внутри h2 */}
            <p className="mt-1 text-xs leading-5 text-gray-500">{task.description}</p> {/* Описание задачи внутри p */}
          </div>
          <div>
            <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime={task.lastSeen}>{task.lastSeen}</time></p>
            <button onClick={() => handleDelete(task.id)} className="btn btn-danger">Удалить</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
