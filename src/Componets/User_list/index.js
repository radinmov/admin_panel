import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
import { BASE_URL } from '../../config';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Unauthorized",
        text: "You need to log in to access this page.",
        icon: "warning",
        confirmButtonText: "Log In",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    axios
      .get(`${BASE_URL}/api/v1/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {

        }
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch user data. Please try again later.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  const handleNavigation = (url) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(url);
    } else {
      Swal.fire({
        title: "Access Denied",
        text: "You need to log in to access this page.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="p-8 w-full bg-white">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen ">
          <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          <p className="ml-4 text-blue-600 text-lg">Loading transactions...</p>
        </div>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">referral_bonus</th>
                <th className="px-4 py-2 text-left">referral_code</th>
                <th className="px-4 py-2 text-left">total_amount_invested</th>
                <th className="px-4 py-2 text-left">total_profit_less_than_30_days</th>
                <th className="px-4 py-2 text-left">total_profit_more_than_30_days</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.referral_bonus}</td>
                  <td className="px-4 py-2">{user.referral_code}</td>
                  <td className="px-4 py-2">{user.total_amount_invested}</td>
                  <td className="px-4 py-2">{user.total_profit_less_than_30_days}</td>
                  <td className="px-4 py-2">{user.total_profit_more_than_30_days}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleNavigation(`/admin/transactions/user/${user.id}`)}
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
      ) : (
        <div className="text-center text-gray-600 py-4">No users found.</div>
      )}
    </div>
  );
};

export default UserList;
