import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../Icons/Spinner";
import { createImage } from "../appwrite/config";
import { useDispatch } from "react-redux";
import { createTask } from "../store/taskSlice";
import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),
  imageKey: yup
    .mixed()
    .test("required", "Image is required", (value) => {
      return value && value.length > 0;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (!value || value.length === 0) {
        return true; // If no file is selected, skip this test (required will handle it)
      }
      return [
        "image/svg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/jpeg",
      ].includes(value[0].type);
    })
    .test("fileSize", "File is too large ", (value) => {
      if (!value || value.length === 0) {
        return true; // Skip this test if no file is selected
      }
      return value[0].size <= 4000000; // File size less than or equal to 4MB
    }),
});

const TaskDialog = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // Task form state
  console.log(isSubmitting);

  const onSubmit = async (data) => {
    console.log(data);
    // data.state = "todo"
    console.log("adding new tasks");

    const response = await createImage(data.imageKey[0]);
    try {
      const result = await dispatch(
        createTask({ ...data, userId: user.$id, imageKey: response.$id })
      );
      if (createTask.fulfilled.match(result)) {
        console.log("Task created successfully:", result.payload);
      } else {
        console.error("Task creation failed:", result.error.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    onClose();

    // if (errMsg) {
    //   setErr(errMsg);
    // }
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
        {/* <div className="formGroup">
          <label htmlFor="state">State</label>
          <select type="text" id="state" {...register("state")}>
            <option value="">select state</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>

          {errors.state && (
            <span className="err-msg">{`${errors.state.message}`}</span>
          )}
        </div> */}
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
