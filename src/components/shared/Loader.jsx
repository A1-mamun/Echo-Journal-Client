import PropTypes from "prop-types";
import { FadeLoader } from "react-spinners";

const Loader = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <FadeLoader />
    </div>
  );
};

Loader.propTypes = {
  smallHeight: PropTypes.bool,
};

export default Loader;
