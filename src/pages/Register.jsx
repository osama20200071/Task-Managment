import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/AuthContext";
import Spinner from "../Icons/Spinner";
import { toast } from "react-toastify";
import { registerSchema } from "../schemas/index";

function Register() {
  const { handleRegister } = useAuth();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await handleRegister(data, reset);
    } catch (error) {
      console.log("Error:", error);
      toast("Failed to create an Account", {
        position: "top-center",
        type: "error",
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <h2 className="form-title">Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input type="name" id="name" {...register("name")} />
          {errors.name && (
            <span className="err-msg">{`${errors.name.message}`}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && (
            <span className="err-msg">{`${errors.email.message}`}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <span className="err-msg">{`${errors.password.message}`}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="err-msg">{`${errors.confirmPassword.message}`}</span>
          )}
        </div>
        <button className={`btn`} type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Register"}
        </button>
      </form>
      <p className="form-foot">
        Already have an account? Login <Link to="/login">here</Link>
      </p>
    </div>
  );
}

export default Register;
