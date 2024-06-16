import { Chart } from "react-google-charts";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";

const options = {
  chart: {
    title: "Publishers",
    subtitle: "Article number, Total view",
  },
};
const PublisherViewed = () => {
  const axiosCommon = useAxiosCommon();
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publisher-statistics");
      return data;
    },
  });

  const data = [["Publisher", "Total article ", "Total view"]];
  publishers.forEach((publisher) => {
    data.push([
      publisher.publisherName,
      publisher.articleCount,
      publisher.totalViews,
    ]);
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="border-4 border-gray-200 w-full p-10">
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default PublisherViewed;
