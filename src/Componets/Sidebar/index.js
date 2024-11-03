import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(url);
    } else {
      Swal.fire({
        title: "Access Denied",
        text: "You need to log in to access this page.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
      <div className="text-xl font-bold mb-8">admin_panel</div>
      <nav>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => navigate('/')}
              className="hover:text-blue-500 font-bold"
            >
              Login
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => handleNavigation("/admin/home")}
              className="hover:text-blue-500 font-bold"
            >
              Dashboard
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => handleNavigation("/admin/chat")}
              className="hover:text-blue-500 font-bold"
            >
              Chat 
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => handleNavigation("/admin/unconfirmed-transactions")}
              className="hover:text-blue-500 font-bold"
            >
              Unconfirmed Transactions
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => handleNavigation("/admin/settings")}
              className="hover:text-blue-500 font-bold"
            >
              Settings(levels)
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => handleNavigation("/admin/confirm-transaction")}
              className="hover:text-blue-500 font-bold"
            >
              Confirm Transaction
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
