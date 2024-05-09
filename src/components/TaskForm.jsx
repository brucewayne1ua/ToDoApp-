import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks', { name, description });
      console.log('Create new task:', response.data);
      // Crear enter
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">Add name task</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              value={name}
              onChange={handleChangeName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descriptionInput" className="form-label">Add info for task</label>
            <input
              type="text"
              className="form-control"
              id="descriptionInput"
              value={description}
              onChange={handleChangeDescription}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
