import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { Chart } from "react-google-charts";

const options = {
  title: "Number of article published by each publisher",
  is3D: true,
};

const PublisherArticle = () => {
  const axiosCommon = useAxiosCommon();
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publisher-statistics");
      return data;
    },
  });
  const data = [["Publisher", "Published Article"]];
  publishers.forEach((publisher) => {
    data.push([publisher.publisherName, publisher.articleCount]);
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="border-4 border-gray-200">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default PublisherArticle;
