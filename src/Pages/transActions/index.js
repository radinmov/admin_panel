
import React from 'react';
import { useParams } from 'react-router-dom'

const TransActions = () => {
  const { userId } = useParams();
  return (
    <div className="p-8 w-full bg-white">
      <h1 className="text-2xl font-bold mb-4">Transactions for User ID: {userId}</h1>

    </div>
  );
};

export default TransActions;
