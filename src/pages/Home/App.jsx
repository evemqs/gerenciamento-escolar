import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../Home/App.css";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <section id="container-home">
      <div className="container-home">
        <h1>Home</h1>
        <div className="buttons-options"> 
          <Link to="/CadastroEscola"><button className="button-home">Cadastrar Escola</button></Link>
          <Link to="/CadastroProfessor"><button className="button-home">Cadastrar Professor</button></Link>
          <Link to="/CadastroAluno"><button className="button-home">Cadastrar Aluno</button></Link>
          <Link to="/"><button className="button-logout" onClick={() => [logout(), navigate("/")]}>Sair</button></Link>
        </div>
      </div>
    </section>
  );
};

export default Home;