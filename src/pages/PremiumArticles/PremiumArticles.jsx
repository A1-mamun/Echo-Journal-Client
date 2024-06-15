import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Container from "../../components/shared/Container";
import Heading from "../../components/shared/Heading";
import PremiumArticleCard from "./PremiumArticleCard";
import Loader from "../../components/shared/Loader";
import { Helmet } from "react-helmet-async";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/premium-articles");
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <Container>
      <Helmet>
        <title>EchoJournal | Premium Articles</title>
      </Helmet>
      <div className="bg-gray-200 py-5 rounded-md">
        <Heading
          title={"Premium Articles"}
          subtitle={"Enjoy Our premium articles"}
        ></Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-10">
          {articles.map((article, idx) => (
            <PremiumArticleCard
              key={idx}
              article={article}
            ></PremiumArticleCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PremiumArticles;
