import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useTokenHandling } from '../token_handling';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { checkToken } = useTokenHandling();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!checkToken()) return; // Check token before making the API call
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Handle the response data correctly
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          Swal.fire({
            title: 'Unexpected Data',
            text: 'The data received is not in the expected format.',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      } catch (error) {
        // Handle specific 401 errors
        if (error.response && error.response.status === 401) {
          Swal.fire({
            title: 'Unauthorized',
            text: 'Your session has expired or you are not authorized.',
            icon: 'error',
            confirmButtonText: 'Log In',
          }).then(() => {
            navigate('/'); 
          });
        } else {
          // Other errors
          Swal.fire({
            title: 'Error',
            text: 'Failed to fetch user data. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleNavigation = (url) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(url);
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'You need to log in to access this page.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <div className="p-8 w-full bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-500">User List</h1>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
          <p className="ml-4 text-green-500 text-lg">Loading users...</p>
        </div>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-800 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-green-700">
                <th className="px-4 py-2 text-left font-semibold text-gray-300">ID</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Username</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Referral Bonus</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Referral Code</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Total Invested</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Profit 30 Days</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Profit 30 Days</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Referred By</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-700">
                  <td className="px-4 py-2 text-gray-300">{user.id}</td>
                  <td className="px-4 py-2 text-gray-300">{user.username}</td>
                  <td className="px-4 py-2 text-gray-300">{user.referral_bonus}</td>
                  <td className="px-4 py-2 text-gray-300">{user.referral_code}</td>
                  <td className="px-4 py-2 text-gray-300">{user.total_amount_invested}</td>
                  <td className="px-4 py-2 text-gray-300">{user.total_profit_less_than_30_days}</td>
                  <td className="px-4 py-2 text-gray-300">{user.total_profit_more_than_30_days}</td>
                  <td className="px-4 py-2 text-gray-300">{user.referred_by}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleNavigation(`/admin/transactions/user/${user.id}`)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:ring focus:ring-green-300"
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
        <div className="text-center text-gray-300 py-4">No users found.</div>
      )}
    </div>
  );
};

export default UserList;
