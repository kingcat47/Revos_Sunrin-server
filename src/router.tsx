import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    //   { path: "/signup", element: <SignUp_page /> },
      {
        path: "/signin",
        // element: <SignIn_page />,
      },
    //   { path: "/first", element: <First_page /> },
      {
        path: "/add",
        // element: <AddMusic_Page />,
      },
      {
        path: "more/:id",
        element: (
          <>
            {/* <More_Page /> */}
          </>
        ),
      },
    ],
  },
]);

export { router };
