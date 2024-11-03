import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Pages/Login";
import Home from "./Pages/HomePage";
import TransActions from "./Pages/transActions";
import UnconfirmedTransactions from "./Pages/unconfirmed-transactions";
import Settings from "./Pages/levels/index";
import ConfirmTransaction from "./Pages/Confirm_tranactions/index";
import { Chat } from "./Pages/Chat";

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
    path: '/admin/unconfirmed-transactions',
    element: <UnconfirmedTransactions />
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
