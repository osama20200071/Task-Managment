import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import { useSelector } from "react-redux";
import Board from "../components/Board/Board";
import Spinner from "../Icons/Spinner";

function HomePage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner size="60" />;
  }

  return <Board />;
}

export default HomePage;
