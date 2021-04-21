import React from 'react';
import PropTypes from 'prop-types';

const User = ({ users, loading }) => {
  if (loading) return <h2>Loading . . .</h2>;

  return users.map((user, index) => {
    const { id, firstName, lastName } = user; //destructuring
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
      </tr>
    );
  });
};


User.prototype = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default User;
