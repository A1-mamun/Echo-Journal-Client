import Container from "../../../components/shared/Container";
import Heading from "../../../components/shared/Heading";
import TrendingArticle from "../TrendingArticle/TrendingArticle";
import Publisher from "../Publisher/Publisher";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import Plans from "../Plans/Plans";
import { Helmet } from "react-helmet-async";
import Statistics from "../Statistics/Statistics";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import usePremiumUser from "../../../Hooks/usePremiumUser";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [premium] = usePremiumUser();
  const axiosCommon = useAxiosCommon();

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/publishers");
      return data;
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 10000);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <div className="">
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
        <Heading
          title={"Our Plans"}
          subtitle={"Choose our best plan"}
        ></Heading>
        <Plans></Plans>
        <Statistics></Statistics>
        {premium === "no" && (
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="absolute top-48 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-xl mt-12 md:mt-0 bg-gray-100 z-50"
          >
            <Helmet>
              <title>EchoJournal | Home Modal</title>
            </Helmet>

            <div className="w-[400px] h-60 flex flex-col items-center justify-center gap-5">
              <Heading title={"Please subscribe"}></Heading>
              <p className="text-xl text-center">
                To enjoy our premium features, Please subscribe
              </p>

              <Link to="/subscribe">
                <button onClick={closeModal} className="btn btn-sm btn-primary">
                  subscribe
                </button>
              </Link>
            </div>
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default Home;
