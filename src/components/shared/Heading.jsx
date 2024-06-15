import PropTypes from "prop-types";
const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center my-5">
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
};

export default Heading;
