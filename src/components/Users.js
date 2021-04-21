import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

const URL = 'https://dummyapi.io/data/api/user';
const APP_ID = '607f65448ce9f17db07f0f33';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const FULL_URL = `${URL}?limit=${usersPerPage}&page=${currentPage}`;
      const res = await axios.get(FULL_URL, {
        headers: { 'app-id': APP_ID },
      });
      setUsers(res.data.data);
      setTotal(res.data.total);
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage]);

  return (
    <div>
      <table className='content-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <User users={users} loading={loading} />
        </tbody>
      </table>
      <section className='pagination'>
        <button className='btn btn-lg' onClick={() => setCurrentPage(0)}>
          First
        </button>
        <button
          className='btn btn-lg'
          onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className='btn btn-lg'
          onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
          disabled={
            usersPerPage > users.length ||
            (currentPage + 1) * usersPerPage >= total
          }
        >
          Next
        </button>
        <button
          className='btn btn-lg'
          onClick={() => setCurrentPage(Math.floor(total / usersPerPage - 1))}
          disabled={usersPerPage > users.length}
        >
          Last
        </button>
      </section>
    </div>
  );
};

export default Users;
