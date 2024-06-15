import PropTypes from "prop-types";

const Publisher = ({ publisher }) => {
  const { name, logo } = publisher;
  return (
    <div className="bg-white flex flex-col items-center p-5 rounded-md">
      <img className="h-20 w-20 rounded-full mb-3" src={logo} alt="" />

      <h3>{name}</h3>
    </div>
  );
};
Publisher.propTypes = {
  publisher: PropTypes.object,
};

export default Publisher;
