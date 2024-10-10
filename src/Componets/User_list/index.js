// UserList.js
import React from 'react';

const UserList = () => {
  const users = [
    { name: 'Brooklyn Simmons', department: 'Software', status: 'Active', phone: '000-000-0000', email: 'bsimmons@example.com' },
    { name: 'Aubrie Heuser', department: 'Product', status: 'Active', phone: '000-000-0001', email: 'aheuser@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
    { name: 'Leslie Alexander', department: 'Product', status: 'Active', phone: '000-000-0002', email: 'lalexander@example.com' },
  ];

  return (
    <div className="p-8 w-full bg-white">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.department}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-white ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {user.status}
                  </span>
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
