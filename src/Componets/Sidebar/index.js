import useTitle from "../Hook/useTitle";

const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-gray-900 text-white p-4">
        <div className="text-xl font-bold mb-8">doit</div>
        <nav>
          <ul>
            <li className="mb-4"><a href="#" className="hover:text-blue-500">Dashboard</a></li>
            <li className="mb-4"><a href="#" className="hover:text-blue-500">My Wallet</a></li>
            <li className="mb-4"><a href="#" className="hover:text-blue-500">Transactions</a></li>
            <li className="mb-4"><a href="#" className="hover:text-blue-500">Invoices</a></li>
            <li className="mb-4"><a href="#" className="hover:text-blue-500">Card Center</a></li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default Sidebar;
  