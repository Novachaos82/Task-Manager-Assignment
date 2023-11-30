import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            {task.name} - {task.priority}
            <button onClick={() => onDelete(task.id)}>Delete</button>
            <Link to={`/edit/${task.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
