import { useDispatch } from "react-redux";
import { updateTask, updateTasksState } from "../../store/taskSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Delete from "../../Icons/Delete";
import Edit from "../../Icons/Edit";
import { useState } from "react";
import TaskDialog from "../TaskDialog";

const priorityColors = {
  low: "rgb(59 130 246)",
  medium: "rgb(234 179 8)",
  high: "rgb(239 68 68)",
};

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuth();

  const changeTaskState = async (taskId, newState) => {
    if (newState === "") {
      return;
    }

    try {
      //* first make update for this specific item on the db
      const result = await dispatch(
        updateTask({ taskId: task.$id, data: { state: newState } })
      );

      //* if worked update our ui without making another request to db
      if (!result.error) {
        dispatch(
          updateTasksState({ taskId, newTaskState: { state: newState } })
        );
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      toast("Task update failed", {
        position: "top-center",
        type: "error",
        theme: "dark",
      });
    }
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <img src={task.imageKey} alt={task.title} />
        <div>
          <div className="title">
            <span>{task.title}</span>

            {
              // only show delete and edit buttons if the user is the owner of the task
              user.$id === task.userId && (
                <div className="icons">
                  {<Delete onClick={() => console.log("delete clicked")} />}
                  {<Edit onClick={() => setIsEdit(true)} />}
                </div>
              )
            }

            {isEdit && (
              <TaskDialog
                isEdit={true}
                task={task}
                onClose={() => setIsEdit(false)}
              />
            )}
          </div>
          <div className="priority-container">
            <span
              style={{
                color: "white",
                padding: "2px",
                paddingLeft: "6px",
                paddingRight: "6px",
                fontWeight: "400",
                borderRadius: "4px",
                backgroundColor: priorityColors[task.priority],
              }}
            >
              {task.priority}
            </span>
            <select
              onChange={(e) =>
                changeTaskState(task.$id, e.target.value.toLowerCase())
              }
            >
              <option value="">change state</option>
              {["ToDo", "Doing", "Done"].map((newState) => (
                <option
                  key={newState}
                  value={newState.toLowerCase()}
                  disabled={task.state === newState.toLowerCase()}
                >
                  Move to {newState}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="task-content">
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
    </div>
  );
}

export default TaskItem;
