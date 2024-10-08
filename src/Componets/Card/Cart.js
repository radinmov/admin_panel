
const Card = ({ title, balance, bgColor }) => {
    return (
      <div className={`p-6 rounded-lg shadow-lg text-white ${bgColor}`}>
        <h2 className="text-lg">{title}</h2>
        <p className="text-3xl font-bold">{balance}</p>
      </div>
    );
  }
  
  export default Card;
  