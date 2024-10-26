import { useState } from "react";
import Plus from "../../Icons/Plus";
import TaskDialog from "../TaskDialog";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateTask, updateTasksState } from "../../store/taskSlice";
// const initialTasks = [
//   {
//     id: 1,
//     title: "Design new logo",
//     description: "Create a new logo for our brand",
//     priority: "high",
//     state: "todo",
//     imageKey:
//       "https://cloud.appwrite.io/v1/storage/buckets/671bd7d000199570bedd/files/671c9a8300360b07ed98/view?project=671bc151001583f28ca6&project=671bc151001583f28ca6&mode=admin",
//   },
//   {
//     id: 21,
//     title: "Design new logo",
//     description: "Create a new logo for our brand",
//     priority: "high",
//     state: "todo",
//     imageKey:
//       "https://cloud.appwrite.io/v1/storage/buckets/671bd7d000199570bedd/files/671c9a8300360b07ed98/view?project=671bc151001583f28ca6&project=671bc151001583f28ca6&mode=admin",
//   },
//   {
//     id: 31,
//     title: "Design new logo",
//     description: "Create a new logo for our brand",
//     priority: "high",
//     state: "todo",
//     imageKey:
//       "https://cloud.appwrite.io/v1/storage/buckets/671bd7d000199570bedd/files/671c9a8300360b07ed98/view?project=671bc151001583f28ca6&project=671bc151001583f28ca6&mode=admin",
//   },
//   {
//     id: 34,
//     title: "Design new logo",
//     description: "Create a new logo for our brand",
//     priority: "high",
//     state: "todo",
//     imageKey:
//       "https://cloud.appwrite.io/v1/storage/buckets/671bd7d000199570bedd/files/671c9a8300360b07ed98/view?project=671bc151001583f28ca6&project=671bc151001583f28ca6&mode=admin",
//   },
//   {
//     id: 2,
//     title: "Implement login page",
//     description: "Develop the login page for the web app",
//     priority: "medium",
//     state: "doing",
//     imageKey:
//       "https://cloud.appwrite.io/v1/storage/buckets/671bd7d000199570bedd/files/671c9a8300360b07ed98/view?project=671bc151001583f28ca6&project=671bc151001583f28ca6&mode=admin",
//   },
//   {
//     id: 3,
//     title: "Write documentation",
//     description: "Document the new features",
//     priority: "low",
//     state: "done",
//     imageKey:
//       "https://cloud.appwrite.io/v1/storage/buckets/671bd7d000199570bedd/files/671c9a8300360b07ed98/view?project=671bc151001583f28ca6&project=671bc151001583f28ca6&mode=admin",
//   },
// ];

function Board() {
  const dispatch = useDispatch();
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
            // changeTaskState={changeTaskState}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
