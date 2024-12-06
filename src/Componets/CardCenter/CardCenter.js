
import Card from "../Card/Cart";


const CardCenter = () => {
  return (
    <div className="p-8 w-full bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Card Center</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card title="Main Balance" balance="0$" bgColor="bg-blue-500" />
        <Card title="Main Balance" balance="0$" bgColor="bg-orange-500" />
        <Card title="Main Balance" balance="0$" bgColor="bg-purple-500" />
      </div>
    </div>
  );
}

export default CardCenter;
