import React from 'react'
import ReactDOM from 'react-dom/client'
import EditContact, {
  action as editAction,
}
  from "./routes/edit";

import Root from "./routes/root";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Index from "./routes/index";

import './index.css'
import { action as destroyAction } from "./routes/destroy";
import ErrorPage from "./error-page";
import Contact, {
  loader as contactLoader,
} from "./routes/contact";


import { loader as rootLoader, action as rootAction } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
