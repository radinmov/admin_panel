import React from 'react';
import ReactDOM from 'react-dom/client';
import Sidebar from './Componets/Sidebar';
import CardCenter from './Componets/CardCenter/CardCenter';
import "./index.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="flex">
    <Sidebar />
    <CardCenter />
  </div>
);

