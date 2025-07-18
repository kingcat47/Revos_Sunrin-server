import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthCallback, Login, NewsPage, VotePage,Post_Article_Page,Post_Vote_Page, SignupDetail} from "./page";
import DetailPage from "./page/Detail/Article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "login/auth-callback", element: <AuthCallback /> },
      { path: "auth/callback", element: <AuthCallback /> },
      { path: "news", element: <NewsPage /> },
      { path: "news/:id", element: <DetailPage /> },
      { path: "vote/:id", element: <VotePage /> },
      { path: "post", element: <Post_Article_Page /> },
      { path: "post/vote", element: <Post_Vote_Page /> },
      { path: "signup/detail", element: <SignupDetail /> },
    ],
  },
]);

export { router };