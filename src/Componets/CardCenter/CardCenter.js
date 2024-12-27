import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "../Card/Cart";
import { useNavigate } from "react-router-dom";

const CardCenter = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    total_investment_amount: 0,
    total_locked_profit: 0,
    total_profit: 0,
  });

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Swal.fire({
            title: "Unauthorized",
            text: "You need to log in to access this page.",
            icon: "warning",
            confirmButtonText: "Log In",
          }).then(() => {
            navigate("/");
          });
          return;
        }

        const response = await axios.get(
          "http://46.100.94.88:3003/api/v1/admin/total-informations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setData(response.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch data from the server.",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while fetching the data.",
        });
      }
    };

    fetchInformation();
  }, []);

  return (
    <div className="p-8 w-full bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-white">Card Center</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card
          title="Total Investment Amount"
          balance={`${data.total_investment_amount}$`}
          bgColor="bg-blue-500"
        />
        <Card
          title="Total Locked Profit"
          balance={`${data.total_locked_profit}$`}
          bgColor="bg-orange-500"
        />
        <Card
          title="Total Profit"
          balance={`${data.total_profit}$`}
          bgColor="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default CardCenter;
