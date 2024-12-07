import Card from "../Card/Cart";

const CardCenter = () => {
  return (
    <div className="p-8 w-full bg-gray-900 ">
      <h1 className="text-3xl font-bold mb-6 text-white">Card Center</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card title="Main Balance" balance="0$" bgColor="bg-blue-500" />
        <Card title="Savings Balance" balance="0$" bgColor="bg-orange-500" />
        <Card title="Investment Balance" balance="0$" bgColor="bg-purple-500" />
      </div>
    </div>
  );
};

export default CardCenter;
