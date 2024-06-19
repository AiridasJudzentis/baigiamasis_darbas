import React from "react";
import PropTypes from "prop-types";

const UserInfo = ({ author }) => {
  if (!author) {
    return <div>Loading author information...</div>;
  }

  return (
    <div className="user-info">
      <h3>Author Information</h3>
      <p>Full Name: {author.full_name}</p>
      <p>Email: {author.email}</p>
      <p>Joined: {new Date(author.date_joined).toLocaleDateString()}</p>
    </div>
  );
};

UserInfo.propTypes = {
  author: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date_joined: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfo;
