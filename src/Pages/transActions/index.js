import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../config";
import Sidebar from "../../Componets/Sidebar/index";

const UserTransactions = () => {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState([]);
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
      .get(`${BASE_URL}/api/v1/admin/transactions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch transactions. Please try again later.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId, navigate]);

  if (isLoading) {
    return <div className="text-center">Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return (
      <>
        <Sidebar />

        <div className="text-center text-gray-600 py-4">No transactions found for this user.</div>
      </>
    )
  }

  return (
    <div className="flex">
        <Sidebar />
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-8 w-full bg-white">
        <h1 className="text-2xl font-bold mb-4">User Transactions</h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-4 py-2">{transaction.amount}</td>
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => navigate("/admin/home")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to User List
        </button>
      </div>
    </div>
  );
};

export default UserTransactions;
