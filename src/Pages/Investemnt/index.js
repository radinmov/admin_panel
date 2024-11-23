import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config';
import Sidebar from '../../Componets/Sidebar';

const Investment = () => {
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'You need to log in to access this page.',
        icon: 'warning',
        confirmButtonText: 'Log In',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const fetchInvestments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/admin/investments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setInvestments(data.investments || []);
      } catch (err) {
        setError(err.message);
        Swal.fire({
          title: 'Error fetching data',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, [navigate]);

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="flex h-screen ">
      <Sidebar />

      <div className="flex-1 p-8 bg-white overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Investment List</h1>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : investments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">User ID</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Cycle Length</th>
                  <th className="px-4 py-2 text-left">Start Time</th>
                  <th className="px-4 py-2 text-left">Withdrawable Profit</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr key={investment.id} className="border-b">
                    <td className="px-4 py-2">{investment.id}</td>
                    <td className="px-4 py-2">{investment.user_id}</td>
                    <td className="px-4 py-2">{investment.amount}</td>
                    <td className="px-4 py-2">{investment.cycle_length}</td>
                    <td className="px-4 py-2">{new Date(investment.start_time).toLocaleString()}</td>
                    <td className="px-4 py-2">{investment.withdrawable_profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-600 py-4">No investments found.</div>
        )}
      </div>
    </div>
  );
};

export default Investment;
