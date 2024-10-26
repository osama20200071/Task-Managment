import "../form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import Spinner from "../Icons/Spinner";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { loginSchema } from "../schemas";

function Login() {
  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // i return the error message from the handleLogin if there is error
    try {
      await handleLogin(data, reset);
    } catch (err) {
      toast("Invalid credentials. Please check the email and password.", {
        position: "top-center",
        type: "error",
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
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

        <button className={`btn`} type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Login"}
        </button>
      </form>
      <p className="form-foot">
        Don&apos;t have an account? Register <Link to="/register">here</Link>
      </p>
    </div>
  );
}

export default Login;
