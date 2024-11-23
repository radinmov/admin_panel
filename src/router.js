import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Pages/Login";
import Home from "./Pages/HomePage";
import TransActions from "./Pages/transActions";
import UnconfirmedTransactions from "./Pages/unconfirmed-transactions";
import Settings from "./Pages/levels/index";
import ConfirmTransaction from "./Pages/Confirm_tranactions/index";
import { Chat } from "./Pages/Chat";
import Investment from './Pages/Investemnt';
import { UInvestment } from "./Pages/Investemnt_update";
import { Register } from "./Pages/register";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/admin/home',
    element: <Home />
  },
  {
    path: '/admin/transactions',
    element: <TransActions />
  },
  {
    path: '/admin/transactions/user/:userId',
    element: <TransActions />
  },
  {
    path: '/admin/unconfirmed-transactions',
    element: <UnconfirmedTransactions />
  },
  {
    path: '/admin/Investemnt',
    element: <Investment />
  },
  {
    path: '/admin/Investemnt/update',
    element: <UInvestment />
  },
  {
    path: '/admin/settings',
    element: <Settings />
  },
  {
    path: '/admin/chat',
    element: <Chat />
  },
  {
    path: '/admin/confirm-transaction',
    element: <ConfirmTransaction />
  },
]);

export default function Router() {
  return (
    <RouterProvider router={routes} />
  );
}
