import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Heading from "../../../components/shared/Heading";
import Loader from "../../../components/shared/Loader";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const axiosCommon = useAxiosCommon();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users");
      return data;
    },
  });

  //   make admin
  const handleMakeAdmin = async (id) => {
    try {
      const { data } = await axiosCommon.patch(`/users/${id}`);
      if (data.modifiedCount) {
        toast.success("Admin created successfully");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="bg-gray-200 rounded-md py-10 px-7 min-h-[calc(100vh-20px)]">
      <Helmet>
        <title>EchoJournal | Dashboard All Users</title>
      </Helmet>
      <Heading title={"All User"}></Heading>
      <div className="overflow-x-auto ">
        <table className="min-w-full">
          <colgroup>
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
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">
                  <p>{idx + 1}</p>
                </td>
                <td className="p-1">
                  <img
                    className="h-16 w-20 rounded-md"
                    src={user?.image}
                    alt=""
                  />
                </td>
                <td className="p-3">
                  <p>{user?.name}</p>
                </td>

                <td className="p-3">
                  <p>{user?.email}</p>
                </td>

                <td className="p-3 ">
                  {user?.role === "admin" ? (
                    <>
                      <p className="badge badge-lg badge-info">Admin</p>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user?._id)}
                        className="btn btn-accent btn-sm "
                      >
                        Make Admin
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
