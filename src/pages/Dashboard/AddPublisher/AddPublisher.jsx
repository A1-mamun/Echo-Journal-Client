import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../../../components/shared/Heading";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";

const AddPublisher = () => {
  const [addLoading, setAddLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
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
      setAddLoading(true);
      // upload image
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      // update image url to article object
      const updateData = {
        name,
        image: data.data.display_url,
      };

      // post article to server
      const res = await axiosCommon.post("/add-publisher", updateData, {
        headers: { "content-type": "application/json" },
      });
      if (res.data.insertedId) {
        reset();
        setAddLoading(false);
        toast.success("Publisher upload successfully");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className=" bg-gray-100 rounded-xl px-5 md:px-8 lg:px-20 py-10  min-h-[calc(100vh-20px)]">
      <Helmet>
        <title>EchoJournal | Add Publisher</title>
      </Helmet>
      <Heading title={"Add Publisher"}></Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="form-control w-full lg:w-1/2">
          <div className="label">
            <span className="label-text text-blue-400 text-sm md:text-base">
              Name
            </span>
          </div>
          <input
            name="name"
            type="text"
            className="input input-bordered text-gray-400"
            placeholder="Enter publisher name "
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        <div className="form-control w-full lg:w-1/2">
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

        <div className="form-control mt-8 border w-full lg:w-1/2">
          <button
            disabled={addLoading}
            className="btn btn-block bg-green-500 text-white text-base md:text-lg "
          >
            {addLoading ? (
              <PiSpinner className=" animate-spin m-auto text-primary text-xl" />
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
