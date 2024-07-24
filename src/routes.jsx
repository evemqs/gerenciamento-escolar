import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginUsuario from "./pages/LoginUsuario/App";
import CadastroUsuario from "./pages/CadastroUsuario/App";
import CadastroEscola from "./pages/CadastroEscola/App";
import CadastroProfessor from "./pages/CadastroProfessor/App";
import CadastroAluno from "./pages/CadastroAluno/App";
import Home from "./pages/Home/App";

const MainRouter = () => {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginUsuario />} index />
            <Route path="/Home" element={<Home />} />
            <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
            <Route path="/CadastroEscola" element={<CadastroEscola />} />
            <Route path="/CadastroProfessor" element={<CadastroProfessor />} />
            <Route path="/CadastroAluno" element={<CadastroAluno />} />
          </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;