import { Chart } from "react-google-charts";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Loader from "../../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
// const data = [
//   ["Element", "Density"],
//   ["Copper", 8.94], // RGB value
//   ["Silver", 10.49], // English color name
//   ["Gold", 19.3],
//   ["Platinum", 21.45], // CSS-style declaration
// ];
const MostViewedArticle = () => {
  const axiosCommon = useAxiosCommon();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/articles-trend");
      console.log(data);
      return data;
    },
  });

  const data = [["Title", "Views"]];
  articles.slice(0, 5).forEach((article) => {
    data.push([article.title, article.view]);
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="border-4 border-gray-200 lg:w-1/2 ">
      <Heading title={"Top 5 viewed article"}></Heading>
      <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
    </div>
  );
};

export default MostViewedArticle;
