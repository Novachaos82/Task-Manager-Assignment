// src/components/AddTaskForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTaskForm = ({ onAdd }) => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) return;
    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      priority,
      completed: false,
    };
    onAdd(newTask);
    setTaskName("");
    setTaskDescription("");
    setPriority("low");

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>
      <label>
        Task Description:
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      </label>
      <label>
        Priority:
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
