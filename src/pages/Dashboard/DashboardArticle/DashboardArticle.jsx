import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import Loader from "../../../components/shared/Loader";
import toast from "react-hot-toast";
import { FcApproval } from "react-icons/fc";
import { MdDeleteForever, MdWorkspacePremium } from "react-icons/md";
import { RiChatDeleteLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import Modal from "react-modal";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DashboardArticle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [declineId, setDeclineId] = useState(null);

  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-articles");
      return data;
    },
  });

  const openModal = (id) => {
    setIsOpen(true);
    setDeclineId(id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeclineId(null);
  };

  //   make premium
  const handleMakePremium = async (id) => {
    try {
      const { data } = await axiosSecure.patch(`/make-premium/${id}`);
      if (data.modifiedCount) {
        toast.success("Make premium successfully");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Approve
  const handleApprove = async (id) => {
    try {
      const { data } = await axiosSecure.patch(`/approve/${id}`);
      if (data.modifiedCount) {
        toast.success("Article approved");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  // Delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.patch(`/delete/${id}`);
      if (data.deletedCount) {
        toast.success("Article deleted");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  // form submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const declineText = { declined_text: e.target.reason.value };
      const { data } = await axiosSecure.patch(
        `/decline/${declineId}`,
        declineText
      );
      if (data.modifiedCount) {
        toast.success("Article declined");
        closeModal();
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="bg-gray-200 rounded-md py-10 px-4 min-h-[calc(100vh-20px)]">
      <Helmet>
        <title>EchoJournal | Dashboard All Articles</title>
      </Helmet>
      <Heading title={"All Article"}></Heading>
      <div className="overflow-x-auto ">
        <table className="min-w-full">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">#</th>
              <th className="p-3">Photo</th>
              <th className="p-3">Author</th>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Publisher</th>
              <th className="p-3">Premium</th>
              <th className="p-3"></th>
              <th className="p-3"></th>
              <th className="p-3"></th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr
                key={idx}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">
                  <p>{idx + 1}</p>
                </td>
                <td className="p-1">
                  <img
                    className="h-12 w-18 rounded-md"
                    src={article?.author_image}
                    alt=""
                  />
                </td>
                <td className="p-3">
                  <p>{article?.author_name}</p>
                  <p className="text-sm">{article?.author_email}</p>
                </td>

                <td className="p-3">
                  <p>{article?.title}</p>
                </td>
                <td className="p-3">
                  <p>{article?.date}</p>
                </td>
                <td className="p-3">
                  <p
                    className={` badge badge-lg 
                    ${article?.status === "Approved" && "badge-success"}
                    ${article?.status === "Pending" && "badge-info"}
                    ${article?.status === "Declined" && "badge-error"}`}
                  >
                    {article?.status}
                  </p>
                </td>
                <td className="p-3">
                  <p>{article?.publisher}</p>
                </td>
                <td className="p-3">
                  <p>
                    {article?.access === "premium" ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <RxCross2 className="text-error" />
                    )}
                  </p>
                </td>
                <td className="p-2 text-right ">
                  <div className=" tooltip" data-tip="Approve">
                    <button
                      onClick={() => handleApprove(article?._id)}
                      className="btn btn-success btn-sm "
                    >
                      <FcApproval />
                    </button>
                  </div>
                </td>
                <td className="p-2 text-right ">
                  <div className="tooltip" data-tip="Decline">
                    <button
                      onClick={() => openModal(article?._id)}
                      className="btn btn-secondary btn-sm "
                    >
                      <RiChatDeleteLine />
                    </button>
                  </div>
                </td>
                <td className="p-2 text-right ">
                  <div className="tooltip" data-tip="Delete">
                    <button
                      onClick={() => handleDelete(article?._id)}
                      className="btn btn-error btn-sm "
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </td>

                <td className="p-2 text-right ">
                  <div className="tooltip" data-tip="Make Premium">
                    <button
                      onClick={() => handleMakePremium(article?._id)}
                      className="btn btn-accent btn-sm "
                    >
                      <MdWorkspacePremium />
                    </button>
                  </div>
                </td>
                <Modal
                  isOpen={isOpen}
                  onRequestClose={closeModal}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-xl mt-12 md:mt-0 bg-gray-100"
                >
                  <div className="w-96 h-60 flex items-center justify-center p-5">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col items-center gap-8 w-full"
                    >
                      <div className="form-control w-full">
                        <div className="label">
                          <span className="label-text text-blue-400 text-sm md:text-base">
                            Decline reason
                          </span>
                        </div>
                        <textarea
                          name="reason"
                          type="text"
                          className="textarea textarea-bordered w-full h-20 rounded-md px-2  text-gray-400"
                          placeholder="Enter reason "
                        />
                      </div>
                      <button className="btn btn-sm btn-error">Decline</button>
                    </form>
                  </div>
                </Modal>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardArticle;
