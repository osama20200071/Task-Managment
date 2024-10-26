import { useState } from "react";
import Plus from "../../Icons/Plus";
import TaskDialog from "../TaskDialog";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";

function Board() {
  const { tasks } = useSelector((state) => state.tasks);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterState, setFilterState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const filteredTasks = tasks.filter(
    (task) =>
      (filterPriority === "" || task.priority === filterPriority) &&
      (filterState === "" || task.state === filterState) &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="board-container">
      <div className="header-container">
        <div className="board-header">
          <div>Taskly Board</div>
          <button className="btn" onClick={() => setIsAddTaskOpen(true)}>
            <Plus /> <span>Add Task</span>
          </button>
        </div>
        <div className="board-filter">
          <div className="filter">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Filter by Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="filter">
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="">Filter by State</option>
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {isAddTaskOpen && (
          <TaskDialog
            open={isAddTaskOpen}
            onClose={() => setIsAddTaskOpen(false)}
          />
        )}
      </div>
      <div className="board-body">
        {["ToDo", "Doing", "Done"].map((state) => (
          <TaskList
            key={state}
            tasks={filteredTasks.filter(
              (task) => task.state === state.toLowerCase()
            )}
            header={state}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
