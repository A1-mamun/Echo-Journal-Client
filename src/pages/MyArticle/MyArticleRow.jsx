import {
  BiDetail,
  BiEditAlt,
  BiSolidMessageRoundedDetail,
} from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/shared/Heading";
import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { PiSpinner } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

// options for tags
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

const MyArticleRow = ({ idx, article, refetch }) => {
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [addLoading, setAddLoading] = useState(false);
  const multiSelectInputRef = useRef();
  const selectInputRef = useRef();
  const { _id, title, image, status, access, declined_text } = article;
  const [multiSelectedOption, setMultiSelectedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publishers");
      return data;
    },
  });

  const Publishers = [];

  publishers.forEach((publisher) => {
    const value = publisher.name;
    const label = publisher.name;

    const newPublisher = { value, label };

    Publishers.push(newPublisher);
  });

  // clear react select after submit
  const onClear = () => {
    selectInputRef.current.clearValue();
    multiSelectInputRef.current.clearValue();
  };
  // handle update article
  const onSubmit = async (data) => {
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
      status: "Pending",
      view: 0,
      date,
      access: "user",
    };
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
        ...newData,
        image: data.data.display_url,
      };

      // post article to server
      const res = await axiosCommon.patch(
        `/update-article/${_id}`,
        updateData,
        {
          headers: { "content-type": "application/json" },
        }
      );
      if (res.data.modifiedCount) {
        reset();
        setMultiSelectedOption(null);
        setSelectedOption(null);
        setAddLoading(false);
        onClear();
        closeUpdateModal();
        toast.success("Article updated successfully");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // handle delete article
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/delete-article/${id}`);

      if (data.deletedCount) {
        toast.success("article deleted successfully");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const openDeclineModal = () => {
    setIsDeclineModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  const closeDeclineModal = () => {
    setIsDeclineModalOpen(false);
  };
  return (
    <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
      <td className="p-3 ">
        <p>{idx + 1}</p>
      </td>
      <td className="p-1 ">
        <img
          className="w-12 h-10 md:w-16 md:h-14 lg:h-16 lg:w-20 rounded-md"
          src={image}
          alt=""
        />
      </td>
      <td className="p-1 md:p-3 text-sm md:text-base">
        <p>{title}</p>
      </td>
      <td className="p-1 md:p-3">
        {status === "Declined" ? (
          <>
            <div className="flex flex-col gap-1">
              <p className="badge badge-sm md:badge-lg badge-error">Declined</p>
              <button
                onClick={openDeclineModal}
                className="btn btn-info btn-xs w-10"
              >
                <BiSolidMessageRoundedDetail />
              </button>
            </div>
          </>
        ) : (
          <>
            <p
              className={`badge badge-lg ${
                status === "Approved" && "badge-success"
              }
                    ${status === "Declined" && "badge-error"}
                    ${status === "Pending" && "badge-info"}`}
            >
              {article?.status}
            </p>
          </>
        )}
      </td>
      <td className="p-1 md:p-3">
        <p>
          {access === "premium" ? (
            <FaCheck className="text-success" />
          ) : (
            <RxCross2 className="text-error" />
          )}
        </p>
      </td>
      <td className="p-1 md:p-3 text-right">
        <div className="tooltip" data-tip="Delete">
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-error btn-sm text-xl"
          >
            <MdDelete />
          </button>
        </div>
      </td>
      <td className="p-1 md:p-3 text-right">
        <div className="tooltip" data-tip="Edit">
          <button
            onClick={openUpdateModal}
            className="btn btn-success btn-sm text-xl"
          >
            <BiEditAlt />
          </button>
        </div>
      </td>
      <td className="p-1 md:p-3 text-right">
        <div className="tooltip" data-tip="Details">
          <Link to={`/article/${_id}`}>
            <button
              // onClick={() => handleDelete(_id)}
              className="btn btn-info btn-sm text-xl"
            >
              <BiDetail />
            </button>
          </Link>
        </div>
      </td>
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-xl mt-12 md:mt-0 bg-gray-100"
      >
        <Helmet>
          <title>EchoJournal | Update Article</title>
        </Helmet>
        <Heading title={"Update Article"}></Heading>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 w-[700px]">
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
                defaultValue={title}
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
                "Update Article"
              )}
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isDeclineModalOpen}
        onRequestClose={closeDeclineModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-xl mt-12 md:mt-0 bg-gray-100"
      >
        <Helmet>
          <title>EchoJournal | article Decline Reason</title>
        </Helmet>
        <Heading title={"Decline reason"}></Heading>
        <div className="w-72 h-48 flex flex-col items-center justify-center gap-10">
          <p className="text-xl">{declined_text}</p>

          <button onClick={closeDeclineModal} className="btn btn-sm btn-error">
            close
          </button>
        </div>
      </Modal>
    </tr>
  );
};

MyArticleRow.propTypes = {
  article: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default MyArticleRow;
