import MostViewedArticle from "./MostViewedArticle";
import PublisherArticle from "./PublisherArticle";
import PublisherViewed from "./PublisherViewed";

const DashboardHome = () => {
  //   console.log(publisher);

  return (
    <div className="space-y-7">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <PublisherArticle />
        <MostViewedArticle />
      </div>

      <PublisherViewed />
    </div>
  );
};

export default DashboardHome;
