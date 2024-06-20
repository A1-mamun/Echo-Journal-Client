import { FaUsers, FaUsersSlash } from "react-icons/fa6";
import { MdWorkspacePremium } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Loader from "../../../components/shared/Loader";
import CountUp from "react-countup";
import Heading from "../../../components/shared/Heading";

const Statistics = () => {
  const axiosCommon = useAxiosCommon();
  const { data: statistics = [], isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/statistics");
      return data;
    },
  });
  console.log(statistics);
  if (isLoading) return <Loader></Loader>;
  return (
    <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
      <Heading title={"Our User Statistics"}></Heading>
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <FaUsers className="text-white" size={35} />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              <CountUp
                enableScrollSpy={true}
                start={0}
                end={statistics?.users}
              />
            </p>
            <p className="capitalize">Users</p>
          </div>
        </div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <FaUsersSlash className="text-white" size={35} />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              <CountUp
                enableScrollSpy={true}
                start={0}
                end={statistics?.normalUsers}
              />
            </p>
            <p className="capitalize">Normal Users</p>
          </div>
        </div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <MdWorkspacePremium className="text-white" size={35} />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              <CountUp
                enableScrollSpy={true}
                start={0}
                end={statistics?.users - statistics?.normalUsers}
              />
            </p>
            <p className="capitalize">Premium Users</p>
          </div>
        </div>
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
            <GiClick className="text-white" size={35} />
          </div>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-3xl font-semibold leading-none">
              <CountUp
                enableScrollSpy={true}
                start={0}
                end={statistics?.totalView}
              />
            </p>
            <p className="capitalize">Total view</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
