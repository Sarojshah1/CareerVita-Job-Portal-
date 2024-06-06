import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/login";
import Home from "./Components/home";
import Error404 from "./Error404";
import Footer from "./Components/Footer/Footer";
import Register from "./Components/Register";
import CompanyProfile from "./Components/CompanyProfile";
import PostAJob from "./Components/PostAJob";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Categories from "./Components/Categories";
import Jobs from "./Components/Jobs/Jobs";
import Details from "./Components/Details/Details";
import Companies from "./Components/Companies/Companies";
import UserProfile from "./Components/UserProfile/UserProfile";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
    <Footer />
  </>
);

const queryClient = new QueryClient()

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error404/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Catagories",
          element: <Categories />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/companyProfile",
          element: <CompanyProfile/>,
        },
        {
          path: "/postajob",
          element: <PostAJob/>,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: '/details/:jobId',
          element: <Details />,
        },
        {
          path: '/company',
          element: <Companies />,
        },
        {
          path: '/jobseeker',
          element: <UserProfile />,
        },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>

    </>
  );
}

export default App;
