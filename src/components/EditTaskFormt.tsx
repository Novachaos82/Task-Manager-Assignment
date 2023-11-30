// src/components/EditTaskForm.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Task {
  id: number;
  name: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface EditTaskFormProps {
  tasks: Task[];
  onSave: (updatedTask: Task) => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ tasks, onSave }) => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const task = tasks.find((t) => t.id.toString() === taskId);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  useEffect(() => {
    if (task) {
      setTaskName(task.name || "");
      setTaskDescription(task.description || "");
      setPriority(task.priority || "low");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: Task = {
      ...task!,
      name: taskName,
      description: taskDescription,
      priority,
    };
    onSave(updatedTask);

    // Redirect to the home page after saving changes
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="taskName"
          >
            Task Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="taskName"
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="taskDescription"
          >
            Task Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="taskDescription"
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priority"
          >
            Priority:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
