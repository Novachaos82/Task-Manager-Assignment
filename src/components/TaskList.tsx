// src/components/TaskList.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Task {
  id: number;
  name: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  // Define priority colors
  const priorityColors = {
    low: "bg-green-200",
    medium: "bg-yellow-200",
    high: "bg-red-200",
  };

  return (
    <div className="flex justify-center">
      <ul className="flex flex-wrap gap-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 m-2 rounded-lg flex gap-3 items-center text-xl ${
              priorityColors[task.priority]
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="h-6 w-6"
            />
            <div>
              <p
                className={`text-xl font-semibold ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.name}
                <p className="text-sm">{task.description}</p>
              </p>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
            <Link to={`/edit/${task.id}`}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
