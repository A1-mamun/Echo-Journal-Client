import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Heading from "../../components/shared/Heading";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/shared/Loader";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const ArticleDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosCommon = useAxiosCommon();
  // fetching article
  const { data: article = {}, isLoading } = useQuery({
    queryKey: ["article"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/article/${id}`);
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <Container>
      <Helmet>
        <title>EchoJournal | {article?.title}</title>
      </Helmet>
      {article && (
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
                <img
                  className="object-cover w-full"
                  src={article.image}
                  alt="header image"
                />
              </div>
              <Heading title={article.title} />
              <hr />
            </div>
          </div>
          <div className="">
            {/* Article details */}
            <div className=" flex flex-col gap-8 mt-5">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Author: {article?.author_name}</div>

                    <img
                      className="rounded-full"
                      height="30"
                      width="30"
                      alt="Avatar"
                      src={article?.author_image}
                    />
                  </div>
                  <div className="font-light text-neutral-500">
                    <div>Publisher: {article?.publisher}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.tags.map((tag, idx) => (
                    <div key={idx} className="badge badge-lg badge-neutral">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <h4>Posted Date: {article.posted_date}</h4>
                <h4>Total Views: {article.view}</h4>
              </div>
              <hr />
              <div
                className="
          text-lg font-light text-neutral-500 text-justify"
              >
                {article?.description}
              </div>
              <hr />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ArticleDetails;
