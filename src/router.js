
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Pages/Login";
import  Home  from "./Pages/HomePage";
import  TransActions  from "./Pages/transActions";
import Deposit from "./Pages/deposits/index"; 
import Withdraw from "./Pages/withdraw/index"; 
import UnconfirmedTransactions from "./Pages/unconfirmed-transactions";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/admin/home',
    element: <Home />
  },
  {
    path: '/admin/transactions/user/:userId',
    element: <TransActions />
  },
  {
    path: '/admin/deposit/user/:userId',
    element: <Deposit />
  },
  {
    path: '/admin/withdraw/user/:userId',
    element: <Withdraw />
  },
  {
    path: '/admin/unconfirmed-transactions',
    element: <UnconfirmedTransactions />
  },
]);

export default function Router() {
  return (
    <RouterProvider router={routes} />
  );
}
