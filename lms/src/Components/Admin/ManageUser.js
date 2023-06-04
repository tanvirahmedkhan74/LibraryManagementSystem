import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/getUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID}>
              <td>{user.UserID}</td>
              <td>{user.Username}</td>
              <td>{user.Email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .user-table {
          font-family: fantasy;
          border-collapse: collapse;
          width: 100%;
        }
        
        .user-table th,
        .user-table td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        
        .user-table th {
          background-color: #f2f2f2;
        }
        
        .user-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .user-table tr:hover {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
};

export default ManageUsers;
