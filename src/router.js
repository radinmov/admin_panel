
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Pages/Login";
import { Home } from "./Pages/HomePage";




const routes = createBrowserRouter([
  {
    path: '/admin/home',
    element: <Home />
  },
  {
    path: '/',
    element: <SignIn />
  },


]);



export default function Router() {
  return (
    <RouterProvider router={routes} />
  );
}
