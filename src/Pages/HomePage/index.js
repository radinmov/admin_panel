import Sidebar from "../../Componets/Sidebar";
import CardCenter from "../../Componets/CardCenter/CardCenter";
import useTitle from "../../Componets/Hook/useTitle";

export function Home() {
  const title = useTitle("Home ");
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <CardCenter />
      </div>
    </div>
  );
}
