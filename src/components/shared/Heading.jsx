import PropTypes from "prop-types";
const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center my-5">
      <div className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</div>
      <div className="text-base md:text-lg  font-light text-neutral-500 mt-2">
        {subtitle}
      </div>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
};

export default Heading;
