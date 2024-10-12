const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
      <div className="text-xl font-bold mb-8">admin_panel</div>
      <nav>
        <ul>
          <li className="mb-4"><a href="/admin/home" className="hover:text-blue-500 font-bold">Dashboard</a></li>
          <li className="mb-4"><a href="/admin/unconfirmed-transactions" className="hover:text-blue-500 font-bold">unconfirmd_transaction</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
