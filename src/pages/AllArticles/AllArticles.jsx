import Heading from "../../components/shared/Heading";
import AllArticleCard from "./AllArticleCard";
import Container from "../../components/shared/Container";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AllArticles = () => {
  const [search, setSearch] = useState("");
  const axiosCommon = useAxiosCommon();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles", search],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/approved-articles?search=${search}`
      );
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  if (isLoading) return <Loader></Loader>;
  return (
    <Container>
      <Helmet>
        <title>EchoJournal | All Articles</title>
      </Helmet>
      <div className="bg-gray-200 py-5 rounded-md">
        <Heading
          title={"All Articles"}
          subtitle={"Enjoy Our all article"}
        ></Heading>
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center "
        >
          <label className="input input-bordered flex items-center gap-2 mb-10 max-w-96">
            <input
              name="search"
              type="text"
              className="grow"
              placeholder="Search"
            />
            <button className="btn btn-sm btn-primary"> search</button>
          </label>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-10">
          {articles.map((article, idx) => (
            <AllArticleCard key={idx} article={article}></AllArticleCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllArticles;
