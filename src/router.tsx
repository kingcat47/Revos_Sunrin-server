import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Signin, Signup, NewsPage, VotePage,Post_Article_Page,Post_Vote_Page} from "./page";
import DetailPage from "./page/Detail/Article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "news", element: <NewsPage /> },
      { path: "news/:id", element: <DetailPage /> },
      { path: "vote/:id", element: <VotePage /> },
      { path: "post", element: <Post_Article_Page /> },
      { path: "post/vote", element: <Post_Vote_Page /> },
    ],
  },
]);

export { router };