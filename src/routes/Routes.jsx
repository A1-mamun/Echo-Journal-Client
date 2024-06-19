import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home/Home";
import AllArticles from "../pages/AllArticles/AllArticles";
import AddArticle from "../pages/AddArticle/AddArticle";
import Profile from "../pages/Profile/Profile";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import MyArticle from "../pages/MyArticle/MyArticle";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import DashboardArticle from "../pages/Dashboard/DashboardArticle/DashboardArticle";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Subscription from "../pages/Subscription/Subscription";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-article",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/add-article",
        element: (
          <PrivateRoute>
            <AddArticle></AddArticle>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/article/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails></ArticleDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-article",
        element: (
          <PrivateRoute>
            <PremiumArticles></PremiumArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-article",
        element: (
          <PrivateRoute>
            <MyArticle></MyArticle>
          </PrivateRoute>
        ),
      },
      {
        path: "/subscribe",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "home",
        element: (
          <AdminRoute>
            <DashboardHome></DashboardHome>
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-articles",
        element: (
          <AdminRoute>
            <DashboardArticle></DashboardArticle>
          </AdminRoute>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <AdminRoute>
            <AddPublisher></AddPublisher>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
