import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { PiSpinner } from "react-icons/pi";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const Login = () => {
  const [userLoading, setUserLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInGoogle } = useAuth();
  const axiosCommon = useAxiosCommon();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setUserLoading(true);
      // log in
      const { user } = await signIn(email, password);
      // console.log(user.email);
      const { data } = await axiosCommon(`/user/${user?.email}`);
      console.log(data);
      const currentTime = Date.now();
      if (data.isPremium === "yes" && currentTime > data.premiumExpireDate) {
        await axiosCommon.patch(`/not-premium/${user?.email}`);
      }
      toast.success("Logged in successfully");
      setUserLoading(false);
      // navigate after sign in
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      setUserLoading(false);
      toast.error(err.message);
    }
  };

  // Google sign in
  const handleLogInWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      const { user } = await signInGoogle();
      // console.log(user.email);

      const userInfo = {
        email: user.email,
        name: user.displayName,
        image: user.photoURl,
        role: "user",
      };

      // add user to db
      await axiosCommon.post("/social-users", userInfo);

      const { data } = await axiosCommon(`/user/${user?.email}`);
      console.log(data);
      const currentTime = Date.now();
      if (data.isPremium === "yes" && currentTime > data.premiumExpireDate) {
        await axiosCommon.patch(`/not-premium/${user?.email}`);
      }
      setGoogleLoading(false);
      toast.success("Logged in successfully");
      // navigate after sign in
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      setGoogleLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 py-10 rounded-xl">
      <Helmet>
        <title>EchoJournal | Login</title>
      </Helmet>
      <div className="hero-content">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h2 className="text-3xl text-center pt-5">Login your account</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body pb-0 pt-3"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-700">This field is required</span>
              )}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[52px] right-4"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button
                disabled={userLoading || googleLoading}
                className="btn btn-primary "
              >
                {userLoading ? (
                  <PiSpinner className=" animate-spin m-auto text-primary text-xl" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          {/* divider */}
          <div className="card-body pt-2">
            <div className="flex justify-between items-center">
              <div className="border border-gray-500 h-[1px] grow"></div>
              <h4 className="mx-2">or</h4>
              <div className="border border-gray-500 h-[1px] grow"></div>
            </div>
            <div className="">
              <button
                onClick={handleLogInWithGoogle}
                disabled={googleLoading || userLoading}
                className="btn btn-outline w-full"
              >
                {googleLoading ? (
                  <PiSpinner className=" animate-spin m-auto text-primary text-xl" />
                ) : (
                  <>
                    <FcGoogle />
                    Login with Google
                  </>
                )}
              </button>
            </div>
          </div>
          <h2 className="text-center pb-5">
            Do not Have An Account ?
            <Link to="/register" className="text-orange-700 font-medium">
              Register
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
