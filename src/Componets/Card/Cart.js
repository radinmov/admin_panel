const Card = ({ title, balance, bgColor }) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 text-white ${bgColor} transform transition-transform hover:scale-105`}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-2xl font-bold">{balance}</p>
    </div>
  );
};

export default Card;
