import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import { useSelector } from "react-redux";
import Board from "../components/Board/Board";
import { toast } from "react-toastify";

function HomePage() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const notify = () => toast("Wow so easy!", { position: "top-center" });
  useEffect(() => {
    dispatch(fetchTasks());
    notify();
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
