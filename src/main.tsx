import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import ParkPage from "./Components/ParkPageComponents/ParkPage/ParkPage.tsx";
import QuizMain from "./Components/QuizComponents/QuizMain/QuizMain.tsx";
import "./index.css";
import { MainContentContextProvider } from "./Contexts/mainContentContext.tsx";
import { QuizContextProvider } from "./Contexts/quizContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "parks/:parkCode",
    element: <ParkPage />,
  },
  {
    path: "quiz",
    element: <QuizMain />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainContentContextProvider>
      <QuizContextProvider>
        <RouterProvider router={router} />
      </QuizContextProvider>
    </MainContentContextProvider>
  </React.StrictMode>
);
