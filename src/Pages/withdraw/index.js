import React from 'react';
import { useParams } from 'react-router-dom';

const Withdraw = () => {
  const { userId } = useParams();

  return (
    <div className="p-8 w-full bg-white">
      <h1 className="text-2xl font-bold mb-4">Withdraw for User ID: {userId}</h1>
    </div>
  );
};

export default Withdraw;