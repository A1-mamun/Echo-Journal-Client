import Container from "../../../components/shared/Container";
import Heading from "../../../components/shared/Heading";
import TrendingArticle from "../TrendingArticle/TrendingArticle";
import Publisher from "../Publisher/Publisher";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Plans from "../Plans/Plans";
import { Helmet } from "react-helmet-async";
import Statistics from "../Statistics/Statistics";

const Home = () => {
  const axiosCommon = useAxiosCommon();

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publishers");
      return data;
    },
  });

  return (
    <Container>
      <Helmet>
        <title>EchoJournal | Home</title>
      </Helmet>
      <Heading
        title={"Trending Article"}
        subtitle={"Enjoy our most trending articles"}
      ></Heading>
      <TrendingArticle></TrendingArticle>
      <Heading
        title={"Our Publisher"}
        subtitle={"Enjoy our most popular publisher"}
      ></Heading>
      <div className="bg-gray-200 rounded-md p-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {publishers.map((publisher, idx) => (
          <Publisher key={idx} publisher={publisher}></Publisher>
        ))}
      </div>
      <Heading title={"Our Plans"} subtitle={"Choose our best plan"}></Heading>
      <Plans></Plans>
      <Statistics></Statistics>
    </Container>
  );
};

export default Home;
