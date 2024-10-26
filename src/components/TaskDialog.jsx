import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../Icons/Spinner";
import { createImage } from "../appwrite/config";
import { useDispatch } from "react-redux";
import { createTask } from "../store/taskSlice";
import { useAuth } from "../context/AuthContext";
import { createTaskSchema } from "../schemas";
import { toast } from "react-toastify";

const TaskDialog = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });

  const onSubmit = async (data) => {
    try {
      // uploading the image to appwrite bucket
      const response = await createImage(data.imageKey[0]);

      if (response) {
        const result = await dispatch(
          createTask({ ...data, userId: user.$id, imageKey: response.$id })
        );
        if (result.error) {
          throw new Error(result.error.message);
        } else {
          onClose();
        }
      }
    } catch (error) {
      toast("Failed to create new task", {
        position: "top-center",
        type: "error",
        theme: "dark",
      });
    }
  };

  return (
    <div className="dialog-overlay">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" {...register("title")} />
          {errors.title && (
            <span className="err-msg">{`${errors.title.message}`}</span>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea type="text" id="description" {...register("description")} />
          {errors.description && (
            <span className="err-msg">{`${errors.description.message}`}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="priority">Priority</label>
          <select type="text" id="priority" {...register("priority")}>
            <option value="">select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {errors.priority && (
            <span className="err-msg">{`${errors.priority.message}`}</span>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="imageKey">Image</label>
          <input type="file" id="imageKey" {...register("imageKey")} />

          {errors.imageKey && (
            <span className="err-msg">{`${errors.imageKey.message}`}</span>
          )}
        </div>

        <div className="btn-group">
          <button className={`btn`} type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Add Task"}
          </button>
          <button className={`cancel-btn`} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDialog;
