import useTitle from "../../Componets/Hook/useTitle";
import Sidebar from "../../Componets/Sidebar";
import CardCenter from "../../Componets/CardCenter/CardCenter"
import UserList from "../../Componets/User_list";
import { useTokenHandling } from "../../Componets/token_handling";
export function Home() {
  const { checkToken } = useTokenHandling(); 

  useTitle("admin_Home");
  
  if (!checkToken()) return; 


  return (
    <div className="flex h-screen bg-black text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Card Center */}
          <div className="bg-gray-800 shadow rounded-lg p-6">
            <CardCenter />
          </div>

          <div className="bg-gray-800 shadow rounded-lg p-6">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
