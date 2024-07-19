import { Routes, Route } from "react-router-dom";
import LoginUsuario from "./pages/LoginUsuario/App";
import CadastroUsuario from "./pages/CadastroUsuario/App";
import CadastroEscola from "./pages/CadastroEscola/App";
import CadastroProfessor from "./pages/CadastroProfessor/App";
import CadastroAluno from "./pages/CadastroAluno/App";
import Home from "./pages/Home/App";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginUsuario />} index />
      <Route path="../CadastroUsuario" element={<CadastroUsuario />} />
      <Route path="../Home" element={<Home />} />
      <Route path="../CadastroEscola" element={<CadastroEscola />} />
      <Route path="../CadastroProfessor" element={<CadastroProfessor />} />
      <Route path="../CadastroAluno" element={<CadastroAluno />} />
    </Routes>
  );
}

export default MainRouter;