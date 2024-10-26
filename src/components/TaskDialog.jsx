import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../Icons/Spinner";
import { createImage, getImageUrl } from "../appwrite/config";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../store/taskSlice";
import { useAuth } from "../context/AuthContext";
import { createTaskSchema } from "../schemas";
import { toast } from "react-toastify";

const TaskDialog = ({ onClose, isEdit = false, task = null }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, isDirty },
  } = useForm({
    resolver: yupResolver(createTaskSchema({ hasExistingImage: isEdit })),
    defaultValues: task || {
      title: "",
      description: "",
      priority: "",
      imageKey: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedData = Object.keys(dirtyFields).reduce((acc, field) => {
        acc[field] = data[field];
        return acc;
      }, {});

      // if no property is changed return
      if (!isDirty) {
        console.log("nothing changed");
        return;
      }

      // Optional: Handle image upload separately if changed
      if (updatedData.imageKey) {
        console.log("image changed");
        const response = await createImage(updatedData.imageKey[0]);
        updatedData.imageKey = response.$id; // Set imageKey to uploaded file ID
      }

      let result;

      if (isEdit) {
        result = await dispatch(
          updateTask({ taskId: task.$id, data: { ...updatedData } })
        );
      } else {
        result = await dispatch(
          createTask({ ...updatedData, userId: user.$id })
        );
      }

      if (result.error) {
        throw new Error(result.error.message);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast(`Failed to ${isEdit ? "update" : "create"} task`, {
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
          {isEdit && (
            <img
              src={getImageUrl(task.imageKey)}
              alt="Uploaded Task Image"
              className="preview-image"
            />
          )}

          {errors.imageKey && (
            <span className="err-msg">{`${errors.imageKey.message}`}</span>
          )}
        </div>

        <div className="btn-group">
          <button
            className={`btn`}
            type="submit"
            disabled={isSubmitting || (!isDirty && isEdit)}
          >
            {isSubmitting ? <Spinner /> : isEdit ? "Update Task" : "Add Task"}
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
