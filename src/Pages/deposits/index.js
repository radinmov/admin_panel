import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Componets/Sidebar';

const Deposit = () => {
  const { userId } = useParams();

  return (
    <div className=" w-full bg-white flex ">
        <Sidebar />
      <h1 className="text-2xl font-bold mb-4">Deposit for User ID: {userId}</h1>
    </div>
  );
};

export default Deposit;