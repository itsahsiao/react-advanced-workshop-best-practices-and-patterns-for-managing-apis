import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import App from "./App";
import Quotes, { quotesLoader, submitQuoteAction } from "./components/Quotes";
import "./index.css";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return <div>There was a problem!</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":page",
        element: <Quotes />,
        loader: quotesLoader,
        action: submitQuoteAction,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
