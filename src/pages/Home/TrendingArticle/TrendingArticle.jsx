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
import useAuth from "../../../Hooks/useAuth";
import usePremiumUser from "../../../Hooks/usePremiumUser";
import useRole from "../../../Hooks/useRole";

const TrendingArticle = () => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const [premium] = usePremiumUser();
  const [role] = useRole();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/articles-trend");
      console.log(data);
      return data;
    },
  });

  const updateViewCount = async (id) => {
    console.log(id);
    try {
      const { data } = await axiosCommon.patch(`/update-view-count/${id}`);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="p-3 pb-0 md:p-5 md:pb-0 lg:p-7 lg:pb-0 xl:p-10  bg-gray-200 rounded-md ">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, Scrollbar]}
        spaceBetween={20}
        // slidesPerView={4}
        scrollbar={{ clickable: true }}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          // when window width is >= 640px
          750: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          1000: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          1500: {
            slidesPerView: 4,
          },
        }}
        className="h-[570px] w-full"
      >
        {articles.slice(0, 6).map((article, idx) => (
          <SwiperSlide className="pb-3 md:pb-5 lg:pb-10 " key={idx}>
            {article?.access === "premium" && (
              <div className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 h-full ">
                <div>
                  <div className="absolute badge rounded-l mt-2 badge-secondary">
                    premium
                  </div>
                  <img
                    role="presentation"
                    className="object-cover w-full rounded h-40 lg:h-44 dark:bg-gray-500"
                    src={article?.image}
                  />
                </div>

                <div className="p-6 space-y-2 flex flex-col h-[calc(100%-176px)]">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {article?.title}
                  </h3>
                  <span className="text-xs dark:text-gray-600">
                    {article?.publisher}
                  </span>
                  <p className="grow ">
                    {article?.description.slice(0, 200)}{" "}
                    <span className="text-gray-400">See more...</span>{" "}
                  </p>
                  <Link to={`article/${article?._id}`}>
                    <button
                      onClick={() => updateViewCount(article?._id)}
                      disabled={
                        (premium === "no" && !(role === "admin")) || !user
                      }
                      className="btn btn-sm  btn-primary"
                    >
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            )}
            {article?.access !== "premium" && (
              <div className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 h-full ">
                <img
                  role="presentation"
                  className="object-cover w-full rounded h-40 lg:h-44 dark:bg-gray-500"
                  src={article?.image}
                />

                <div className="p-6 space-y-2 flex flex-col h-[calc(100%-176px)]">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {article?.title}
                  </h3>
                  <span className="text-xs dark:text-gray-600">
                    {article?.publisher}
                  </span>
                  <p className="grow ">
                    {article?.description.slice(0, 200)}{" "}
                    <span className="text-gray-400">See more...</span>{" "}
                  </p>
                  <Link to={`article/${article?._id}`}>
                    <button
                      onClick={() => updateViewCount(article?._id)}
                      className="btn btn-sm  btn-primary"
                    >
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticle;
