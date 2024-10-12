import Sidebar from "../../Componets/Sidebar";
import CardCenter from "../../Componets/CardCenter/CardCenter";
import UserList from "../../Componets/User_list/index";
import useTitle from "../../Componets/Hook/useTitle";

export function Home() {
  const title = useTitle("Home");
  
  return (
    <div className="flex">
      <Sidebar />
    
      <div className="flex-grow ml-64 overflow-auto h-screen">
        <div className="p-4">
          <CardCenter />
          <UserList />
        </div>
      </div>
    </div>
  );
}
