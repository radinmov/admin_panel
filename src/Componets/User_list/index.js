import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api.example.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleNavigation = (url) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(url);
    } else {
      Swal.fire({
        title: "Access Denied",
        text: "You need to log in to access this page.",
        icon: "error",
        confirmButtonText: "Okay"
      });
    }
  };

  return (
    <div className="p-8 w-full bg-white">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.department}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button 
                    onClick={() => navigate(`/user/${user.id}`)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    View Transactions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
