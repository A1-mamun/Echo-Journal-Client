import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Modal from "react-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { PiSpinner } from "react-icons/pi";

const Profile = () => {
  const { profileUpdate } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image } = data;
    const imageFile = image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUpdateLoading(true);
      // upload image
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      // profile update
      await profileUpdate(name, data.data.display_url);
      setUpdateLoading(false);
      reset();
      closeModal();
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-[calc(100vh-275px)] flex justify-center items-center">
      <Helmet>
        <title>EchoJournal | User Profile</title>
      </Helmet>
      <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800 ">
        <img
          src={user?.photoURL}
          alt="profile image"
          className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {user?.displayName}
            </h2>
            <p className="px-5 text-xs sm:text-base dark:text-gray-600">
              Junior React Developer
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            <a
              className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
              href="https://github.com/A1-mamun"
              target="_blank"
            >
              <FaGithub />
            </a>
            <a
              className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
              href="https://www.facebook.com/A1Mamun178"
              target="_blank"
            >
              <FaFacebook />
            </a>
            <a
              className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
              href="https://www.linkedin.com/in/a1-mamun/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </div>
          <button onClick={openModal} className="btn btn-sm btn-success">
            Update Profile
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-xl mt-12 md:mt-0 bg-gray-100"
      >
        <div className="w-96 h-72 flex flex-col items-center justify-center gap-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text text-blue-400 text-sm md:text-base">
                  Name
                </span>
              </div>
              <input
                name="name"
                type="text"
                className="input input-bordered text-gray-400"
                placeholder="Enter Name "
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text text-blue-400 text-sm md:text-base">
                  Image
                </span>
              </div>
              <input
                name="image"
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="form-control mt-8 border">
              <button
                disabled={updateLoading}
                className="btn btn-sm  btn-primary "
              >
                {updateLoading ? (
                  <PiSpinner className=" animate-spin m-auto text-primary text-xl" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
