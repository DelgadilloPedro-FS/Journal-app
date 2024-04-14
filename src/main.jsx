// React imports
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Css and Tailwind
import "./index.css";

import ErrorPage from "./error-page";
// Import Routes

import Journal, {
  loader as journalLoader,
  action as journalAction,
} from "./routes/journal";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import EditJournal, {
  action as editAction,
} from "./routes/edit";

import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

// Browser Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "journals/:journalId",
            element: <Journal />,
            loader: journalLoader,
            action: journalAction,
          },
          {
            path: "journals/:journalId/edit",
            element: <EditJournal />,
            loader: journalLoader,
            action: editAction,
          },
          {
            path: "journals/:journalId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);
// DOM 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);