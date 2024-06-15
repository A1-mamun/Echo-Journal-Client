import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useAxiosCommon from "../../Hooks/useAxiosCommon";

const PremiumArticleCard = ({ article }) => {
  const { _id, title, image, publisher, description } = article;

  const axiosCommon = useAxiosCommon();

  const updateViewCount = async (id) => {
    console.log(id);
    try {
      const { data } = await axiosCommon.patch(`/update-view-count/${id}`);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50 shadow-md">
      <div className="">
        <div className="absolute badge rounded-l mt-2 badge-secondary">
          premium
        </div>
        <img
          role="presentation"
          className="object-cover w-full rounded h-44 dark:bg-gray-500"
          src={image}
        />
      </div>

      <div className="p-6 space-y-2 flex flex-col h-[calc(100%-176px)]">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {title}
        </h3>
        <h4 className="text-xs dark:text-gray-600">{publisher}</h4>
        <p className="grow">
          {description.slice(0, 250)}{" "}
          <span className="text-gray-400">See more...</span>{" "}
        </p>

        <Link to={`/article/${_id}`}>
          <button
            onClick={() => updateViewCount(_id)}
            className="btn btn-sm  btn-primary"
          >
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

PremiumArticleCard.propTypes = {
  article: PropTypes.object,
};

export default PremiumArticleCard;
