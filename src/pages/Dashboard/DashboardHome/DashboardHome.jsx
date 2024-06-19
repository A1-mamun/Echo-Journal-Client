import { Helmet } from "react-helmet-async";
import MostViewedArticle from "./MostViewedArticle";
import PublisherArticle from "./PublisherArticle";
import PublisherViewed from "./PublisherViewed";

const DashboardHome = () => {
  return (
    <div className="space-y-7">
      <Helmet>
        <title>EchoJournal | Dashboard Home</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <PublisherArticle />
        <MostViewedArticle />
      </div>
      <PublisherViewed />
    </div>
  );
};

export default DashboardHome;
