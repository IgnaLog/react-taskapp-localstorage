import "./App.css";
import TaskCreator from "./components/TaskCreator";
import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import VisibilityControl from "./components/VisibilityControl";
import { Contaniner } from "./components/Contaniner";

function App() {
  const [tasksItems, setTasksItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const createNewTask = (taskName) => {
    if (!tasksItems.find((task) => task.name === taskName)) {
      setTasksItems([...tasksItems, { name: taskName, done: false }]);
    } else {
      alert("Task repeated");
    }
  };

  const toggleTask = (task) => {
    setTasksItems(
      tasksItems.map((t) =>
        t.name === task.name ? { ...t, done: !t.done } : t
      )
    );
  };

  const cleanTasks = () => {
    setTasksItems(tasksItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksItems));
  }, [tasksItems]);

  /* With StrictMode enabled: 
  // const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true || import.meta.env.PROD) {
      localStorage.setItem("tasks", JSON.stringify(tasksItems));
    }
    return () => {
      effectRan.current = true;
    };
  }, [tasksItems])
  */

  return (
    <main className="bg-dark vh-100 text-white">
      <Contaniner>
        <TaskCreator createNewTask={createNewTask} />

        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />

        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        {showCompleted && (
          <TaskTable
            tasks={tasksItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Contaniner>
    </main>
  );
}

export default App;
