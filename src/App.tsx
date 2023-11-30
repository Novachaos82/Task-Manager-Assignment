import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskFormt.tsx";
interface task {
  id: number;
  name: string;
  completed: boolean;
}

const App = () => {
  // Load tasks from localStorage on component mount
  const initialTasks =
    JSON.parse(localStorage.getItem("tasks") as string) || [];
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: task) => {
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks((prevTasks: task[]) =>
      prevTasks.map((task: task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks: task[]) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleEditTask = (updatedTask: task) => {
    setTasks((prevTasks: task[]) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <Router>
      <div>
        <nav className="flex justify-center bg-black">
          <ul className=" text-white flex p-4 gap-8">
            <li className="bg-blue-600 px-4 py-2 rounded-lg ">
              <Link to="/">Task List</Link>
            </li>
            <li className="bg-red-600 px-4 py-2 rounded-lg ">
              <Link to="/add">Add Task</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/add" element={<AddTaskForm onAdd={handleAddTask} />} />
          <Route
            path="/edit/:taskId"
            element={<EditTaskForm tasks={tasks} onSave={handleEditTask} />}
          />
          <Route
            path="/"
            element={
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
