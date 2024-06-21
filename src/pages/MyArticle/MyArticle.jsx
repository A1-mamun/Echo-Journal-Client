import { Helmet } from "react-helmet-async";
import Heading from "../../components/shared/Heading";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../components/shared/Loader";

import MyArticleRow from "./MyArticleRow";
import Container from "../../components/shared/Container";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyArticle = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-articles?email=${user?.email}`
      );
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <Container>
      <div className="p-2 mx-auto sm:p-4 dark:text-gray-800 mt-5 md:mt-10 lg:mt-20 min-h-[calc(100vh-355px)]">
        <Helmet>
          <title>EchoJournal | My Articles</title>
        </Helmet>
        <Heading title={"My Added Articles"}></Heading>
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
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left text-sm md:text-base">
                <th className="p-3 ">#</th>
                <th className="p-3 ">Photo</th>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">isPremium</th>
                <th className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, idx) => (
                <MyArticleRow
                  key={idx}
                  idx={idx}
                  refetch={refetch}
                  article={article}
                ></MyArticleRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default MyArticle;
