import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AlertProvider from "./context/AlertContext";
import UserContextProvider from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import NavContextProvider from "./context/NavContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <UserContextProvider>
          <NavContextProvider>
            <App />
          </NavContextProvider>
        </UserContextProvider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);
