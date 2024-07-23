import React from "react";
import { AuthProvider } from "./contexts/auth";
import "./styles/global.css";
import MainRouter from "./routes";

const App = () => (
  <AuthProvider>
    <MainRouter />
  </AuthProvider>
);

export default App;