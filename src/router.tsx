import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {Signin, Signup, NewsPage} from "./page";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/signup",
        element: <Signup/> },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/news",
        element:<NewsPage/>
      },
    ],
  },
]);

export { router };
