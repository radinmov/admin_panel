// UserList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const users = [
    { id: 1, name: 'Brooklyn Simmons', department: 'Software', phone: '000-000-0000', email: 'bsimmons@example.com' },
    { id: 2, name: 'Aubrie Heuser', department: 'Product', phone: '000-000-0001', email: 'aheuser@example.com' },
    { id: 3, name: 'Leslie Alexander', department: 'Product', phone: '000-000-0002', email: 'lalexander@example.com' },
    // Add more users as needed
  ];

  const navigate = useNavigate();

  const handleButtonClick = (userId) => {
    navigate(`/admin/transactions/user/${userId}`);
  };

  const handleDepositClick = (userId) => {
    navigate(`/admin/deposit/user/${userId}`); // Navigate to deposit route
  };

  const handleWithdrawClick = (userId) => {
    navigate(`/admin/withdraw/${userId}`); // Navigate to withdraw route
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
                    onClick={() => handleButtonClick(user.id)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    View Transactions
                  </button>
                  <button 
                    onClick={() => handleDepositClick(user.id)} 
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Deposit
                  </button>
                  <button 
                    onClick={() => handleWithdrawClick(user.id)} 
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Withdraw
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
