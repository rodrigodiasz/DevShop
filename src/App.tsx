import { Home } from "./pages/home/home";
import { Cart } from "./pages/cart/cart";
import { Layout } from "./components/layout/layout";
import { ErrorPage } from "./pages/error/error";
import { ProductPage } from "./pages/product/product";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <ProductPage/>,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export { router };
