
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Pages/Login";
import { Home } from "./Pages/HomePage";




const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <SignIn />
  },


]);



export default function Router() {
  return (
    <RouterProvider router={routes} />
  );
}
