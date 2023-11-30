import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTaskForm = ({ tasks, onSave }) => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const task = tasks.find((t) => t.id.toString() === taskId);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (task) {
      setTaskName(task.name || "");
      setTaskDescription(task.description || "");
      setPriority(task.priority || "low");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      name: taskName,
      description: taskDescription,
      priority,
    };
    onSave(updatedTask);

    // Redirect to the home page after saving changes
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
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

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTaskForm;
