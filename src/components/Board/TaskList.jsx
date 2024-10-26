import TaskItem from "./TaskItem";

function TaskList({ header, tasks }) {
  return (
    <div className="task-list">
      <div className="task-list-header">{header}</div>
      <div className="task-list-body">
        {tasks && tasks.map((task) => <TaskItem task={task} key={task.$id} />)}
      </div>
    </div>
  );
}

export default TaskList;
