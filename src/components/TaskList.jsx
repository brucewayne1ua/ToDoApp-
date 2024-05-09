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
      console.error('Error for download task:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks();
    }, 1000); // Update everysecond
    return () => clearInterval(interval);
  }, [tasks]); // Engine useEffect

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
      // Upload tasklist after delete
      fetchTasks();
    } catch (error) {
      console.error('Error for delete task:', error);
    }
  };

  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h2 className="text-sm font-semibold leading-6 text-gray-900">{task.name}</h2> {}
            <p className="mt-1 text-xs leading-5 text-gray-500">{task.description}</p> {}
          </div>
          <div>
            <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime={task.lastSeen}>{task.lastSeen}</time></p>
            <button onClick={() => handleDelete(task.id)} className="btn btn-danger">Delete Task</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
