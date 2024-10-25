import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import { useSelector } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  console.log(tasks);

  if (tasks.length === 0) {
    return <div>Loading...</div>;
  }

  if (tasks.length > 0) {
    return (
      <div>
        {tasks.map((task) => (
          <div key={task.$id}>{task.Title}</div>
        ))}
      </div>
    );
  }

  return <div>HomePage</div>;
}

export default HomePage;
