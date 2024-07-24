import React from "react";
import { Link } from "react-router-dom";
import "../Home/App.css";

const Home = () => {

  return (
    <section id="container-home">
      <div className="container-home">
        <h1>Home</h1>
        <div className="buttons-options"> 
          <Link to="/CadastroEscola"><button className="button-home">Cadastrar Escola</button></Link>
          <Link to="/CadastroProfessor"><button className="button-home">Cadastrar Professor</button></Link>
          <Link to="/CadastroAluno"><button className="button-home">Cadastrar Aluno</button></Link>
          <Link to="/"><button className="button-logout">Sair</button></Link>
        </div>
      </div>
    </section>
  );
};

export default Home;