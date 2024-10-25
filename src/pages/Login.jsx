import "../form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Callout from "../components/Callout";
import Spinner from "../Icons/Spinner";
import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("must be a valid email"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const { handleLogin, user } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  // if user loggedIn go to home page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // i return the error message from the handleLogin if there is error
    const errMsg = await handleLogin(data, reset);

    if (errMsg) {
      setErr(errMsg);
    }
  };

  // prevent loggedIn user from accessing this page
  if (user) return null;

  return (
    <div>
      {err && (
        <Callout type="error" title="Error">
          {err}
        </Callout>
      )}
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
