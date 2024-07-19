import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../LoginUsuario/App.css";
import Button from "../../components/Button/App.css";
import Input from "../../components/Input/App.css";

const App = () => {
  const { loginUsuario } = useAuth();
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  
  const preencher = () => {
    if (!cpf || !senha) {
      setError("Preencha todos os campos obrigatórios.")
      return;
    }

    const res = loginUsuario(cpf, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <section className="container-main">
      <div className="form-container">
        <h1>Seja bem vindo!</h1>
        <div className="form">
          <h2>CPF*</h2>
          <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={(c) => [setCpf(c.target.value), setError("")]}/>
        </div>
        <div className="form">
          <h2>Senha*</h2>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(s) => [setSenha(s.target.value), setError("")]}/>
          <div className="erro">
          </div>
        </div>
        <label>{error}</label>
        <button onClick={preencher}>Entrar</button>
      </div>
    </section>
  )
}

export default App;