import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import { useSelector } from "react-redux";
import Board from "../components/Board/Board";

function HomePage() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (tasks.length === 0) {
    return <div>Loading...</div>;
  }

  if (tasks.length > 0) {
    return (
      <>
        <Board />
      </>
    );
  }

  return <div>HomePage</div>;
}

export default HomePage;
