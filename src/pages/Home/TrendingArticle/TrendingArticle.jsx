import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Scrollbar,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { Link } from "react-router-dom";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";

const TrendingArticle = () => {
  const axiosCommon = useAxiosCommon();
  // useEffect(() => {
  //   fetch("article.json")
  //     .then((res) => res.json())
  //     .then((data) => setArticle(data));
  // }, []);
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/articles-trend");
      console.log(data);
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="p-10 pb-0 bg-gray-200 rounded-md ">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, Scrollbar]}
        spaceBetween={20}
        slidesPerView={4}
        scrollbar={{ clickable: true }}
        // pagination={{ clickable: true }}

        className="h-[580px] w-full"
      >
        {articles.slice(0, 6).map((article, idx) => (
          <SwiperSlide className="pb-10 " key={idx}>
            <div className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 h-full z-10">
              <img
                role="presentation"
                className="object-cover w-full rounded h-44 dark:bg-gray-500"
                src={article?.image}
              />
              <div className="p-6 space-y-2 flex flex-col h-[calc(100%-176px)]">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {article?.title}
                </h3>
                <span className="text-xs dark:text-gray-600">
                  {article?.publisher}
                </span>
                <p className="grow">
                  {article?.description.slice(0, 250)}{" "}
                  <span className="text-gray-400">See more...</span>{" "}
                </p>
                <Link to={`article/${article?._id}`}>
                  <button className="btn btn-sm  btn-primary">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticle;
