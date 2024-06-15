import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { PiSpinner } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Register = () => {
  const [userLoading, setUserLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, profileUpdate, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   register form submit
  const onSubmit = async (data) => {
    // console.log(data);
    const { name, image, email, password } = data;
    const imageFile = image[0];
    // console.log(image[0]);
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      setUserLoading(true);
      // upload image
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      // console.log(data.data.display_url);
      // User Register
      const { user } = await createUser(email, password);
      const userInfo = {
        email: user.email,
        name,
        image: data.data.display_url,
        role: "user",
      };
      // update profile
      await profileUpdate(name, data.data.display_url);
      // add user to db
      await axiosCommon.post("/register-users", userInfo);
      setGoogleLoading(false);
      reset();
      setUserLoading(false);
      toast.success("User created successfully");
      navigate("/");
    } catch (error) {
      setUserLoading(false);
      toast.error(error.message);
    }
  };

  const handleLogInWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      const { user } = await signInGoogle();
      console.log(user.photoURL);
      const userInfo = {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        role: "user",
      };
      console.log(userInfo);

      // add user to db
      await axiosCommon.post("/social-users", userInfo);
      setGoogleLoading(false);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      setGoogleLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="hero min-h-screen py-10 rounded-xl bg-base-200">
      <Helmet>
        <title>EchoJournal | Register</title>
      </Helmet>
      <div className="hero-content ">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h2 className="text-3xl text-center pt-5">Register your account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                name="photo"
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9])/,
                })}
              />
              {errors.password?.type == "required" && (
                <span className="text-red-700">This field is required</span>
              )}
              {errors.password?.type == "minLength" && (
                <span className="text-red-700">
                  Password must be 6 characters
                </span>
              )}
              {errors.password?.type == "pattern" && (
                <span className="text-red-700">
                  Must have one uppercase, one lowercase,one special character
                  and one number
                </span>
              )}
              {errors.password?.type == "maxLength" && (
                <span className="text-red-700">
                  Password must be less than 20 characters
                </span>
              )}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[52px] right-4"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
            <div className="form-control mt-3">
              <button
                disabled={userLoading || googleLoading}
                className="btn btn-primary "
              >
                {userLoading ? (
                  <PiSpinner className=" animate-spin m-auto text-primary text-xl" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          {/* divider */}
          <div className="card-body pt-0">
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
            Already Have An Account ?
            <Link to="/login" className="text-orange-700 font-medium">
              LogIn
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
// test
// test2
