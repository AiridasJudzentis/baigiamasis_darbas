import PropTypes from "prop-types";

const UserInfo = ({ author }) => {
  const calculateJoinDate = (date) => {
    const joinDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return `Joined ${diffDays} days ago`;
    } else if (diffDays < 365) {
      return `Joined ${Math.floor(diffDays / 30)} months ago`;
    } else {
      return `Joined ${Math.floor(diffDays / 365)} years ago`;
    }
  };

  return (
    <div className="user-info">
      <h3>{author.username}</h3>
      <p>Posted {author.uploaded_models.length} models</p>
      <p>{calculateJoinDate(author.date_joined)}</p>
      <button>Hire</button>
    </div>
  );
};

UserInfo.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    uploaded_models: PropTypes.array.isRequired,
    date_joined: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfo;
