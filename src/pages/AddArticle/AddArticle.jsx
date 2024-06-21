import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Heading from "../../components/shared/Heading";
import Select from "react-select";
import { useRef, useState } from "react";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import moment from "moment";
import { PiSpinner } from "react-icons/pi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import usePremiumUser from "../../Hooks/usePremiumUser";
import Swal from "sweetalert2";

// tags options
const options = [
  { value: "Technology", label: "Technology" },
  { value: "AI", label: "AI" },
  { value: "Quantum Computing", label: "Quantum Computing" },
  { value: "Renewable Energy", label: "Renewable Energy" },
  { value: "Solar Power", label: "Solar Power" },
  { value: "Wind Energy", label: "Wind Energy" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Cryptocurrency", label: "Cryptocurrency" },
  { value: "Fintech", label: "Fintech" },
  { value: "Remote Work", label: "Remote Work" },
  { value: "Health", label: "Health" },
  { value: "Nutrition", label: "Nutrition" },
  { value: "Plant-Based Diet", label: "Plant-Based Diet" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "IT", label: "IT" },
  { value: "IoT", label: "IoT" },
  { value: "Smart Homes", label: "Smart Homes" },
  { value: "Automotive", label: "Automotive" },
  { value: "Electric Vehicles", label: "Electric Vehicles" },
  { value: "Metaverse", label: "Metaverse" },
  { value: "VR", label: "VR" },
  { value: "AR", label: "AR" },
  { value: "Meditation", label: "Meditation" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Genetic Engineering", label: "Genetic Engineering" },
  { value: "Science", label: "Science" },
  { value: "Telecommunications", label: "Telecommunications" },
  { value: "Business", label: "Business" },
  { value: "Environment", label: "Environment" },
  { value: "Climate", label: "Climate" },
  { value: "Trends", label: "Trends" },
  { value: "Social Media", label: "Social Media" },
  { value: "Sleep", label: "Wellness" },
];

const AddArticle = () => {
  const { user } = useAuth();
  const [premium] = usePremiumUser();
  const [role] = useRole();
  const [multiSelectedOption, setMultiSelectedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const multiSelectInputRef = useRef();
  const selectInputRef = useRef();

  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publishers");
      return data;
    },
  });

  const onClear = () => {
    selectInputRef.current.clearValue();
    multiSelectInputRef.current.clearValue();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const Publishers = [];

  // create select options for publisher
  publishers.forEach((publisher) => {
    const value = publisher.name;
    const label = publisher.name;

    const newPublisher = { value, label };

    Publishers.push(newPublisher);
  });

  // submit form
  const onSubmit = async (data) => {
    if (premium === "no" && role !== "admin") {
      const { data } = await axiosSecure.get(
        `/my-articles?email=${user?.email}`
      );
      if (data.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "As a normal user you can not post more than 1 article!",
        });
        setAddLoading(false);
        return;
      }
    }
    const newTag = [];
    multiSelectedOption.forEach((tags) => {
      const tag = tags.value;
      newTag.push(tag);
    });
    const { title, image, description } = data;
    const imageFile = image[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const date = moment().format("MMMM Do, YYYY");
    console.log(date);
    const newData = {
      title,
      description,
      publisher: selectedOption.value,
      tags: newTag,
      author_name: user.displayName,
      author_email: user.email,
      author_image: user.photoURL,
      status: "Pending",
      view: 0,
      date,
      access: "user",
    };
    try {
      setAddLoading(true);
      // upload image
      const { data } = await axiosCommon.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      // update image url to article object
      const updateData = {
        ...newData,
        image: data.data.display_url,
      };

      // post article to server
      const res = await axiosSecure.post("/add-article", updateData, {
        headers: { "content-type": "application/json" },
      });
      if (res.data.insertedId) {
        reset();
        setMultiSelectedOption(null);
        setSelectedOption(null);
        setAddLoading(false);
        onClear();
        toast.success("Article upload successfully");
      }
    } catch (err) {
      setAddLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="my-10 container mx-auto bg-gray-100 rounded-xl px-5 md:px-8 lg:px-20 py-10 mt-5 md:mt-10 lg:mt-16 xl:mt-24">
      <Helmet>
        <title>EchoJournal | Add Article</title>
      </Helmet>
      <Heading title={"Add Article"}></Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-10 w-full my-4">
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text text-blue-400 text-sm md:text-base">
                Title
              </span>
            </div>
            <input
              name="title"
              type="text"
              className="input input-bordered text-gray-400"
              placeholder="Enter title "
              {...register("title", { required: true })}
            />
            {errors.title && (
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
        </div>

        <div className="flex flex-col lg:flex-row gap-10 w-full my-4">
          <div className="w-full">
            <div className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text text-blue-400 text-sm md:text-base">
                  Publisher
                </span>
              </div>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={Publishers}
                ref={selectInputRef}
                className="w-full "
              />
              {!selectedOption && (
                <span className="text-red-700">This field is required</span>
              )}
            </div>
            <div className="flex gap-10">
              <div className="form-control w-full mb-8">
                <div className="label">
                  <span className="label-text text-blue-400 text-sm md:text-base">
                    Tags
                  </span>
                </div>
                <Select
                  defaultValue={multiSelectedOption}
                  onChange={setMultiSelectedOption}
                  options={options}
                  isMulti={true}
                  ref={multiSelectInputRef}
                  className="w-full"
                />
                {!multiSelectedOption && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
            </div>
          </div>
          <div className="form-control w-full mb-8">
            <div className="label">
              <span className="label-text text-blue-400 text-sm md:text-base">
                Description
              </span>
            </div>
            <textarea
              name="description"
              type="text"
              className="textarea textarea-bordered h-32 rounded-md px-2  text-gray-400"
              placeholder="Enter short description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
        </div>
        <div className="form-control mt-8 border">
          <button
            disabled={addLoading}
            className="btn btn-block bg-green-500 text-white text-base md:text-lg "
          >
            {addLoading ? (
              <PiSpinner className=" animate-spin m-auto text-primary text-xl" />
            ) : (
              "Add Article"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
