import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../CadastroUsuario/App.css"
import Button from "../../components/Button/App.css";
import Input from "../../components/Input/App.css";

const App = () => {
  const { cadastroUsuario } = useAuth();
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const formatCpf = (value) => {
    value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço
    return value;
  };

  const handleCpfChange = (event) => {
    let newValue = event.target.value;
    newValue = newValue.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Limitar a 11 caracteres
    if (newValue.length > 11) {
      newValue = newValue.substring(0, 11);
    }

    // Formatar o CPF
    const formattedValue = formatCpf(newValue);
    setCpf(formattedValue);
    setError("");
  }

  const alert = () => {
    if (!cpf || !data || !nome || !senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    const res = cadastroUsuario(cpf, data, nome, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("../Home");
  }; 

  return (
    <section className="container-cadastro">
      <div className="form-container">
        <h1>Cadastro</h1>
        <div className="form">
          <h2>Nome<span>*</span></h2>
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => [setNome(e.target.value), setError("")]}/>
        </div>
        <div className="form">
          <h2>CPF<span>*</span></h2>
          <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={handleCpfChange}/>
        </div>
        <div className="form">
          <h2>Data de nascimento<span>*</span></h2>
          <input type="date" value={data} onChange={(e) => [setData(e.target.value), setError("")]}/>
        </div>
        <div className="form">
          <h2>Senha<span>*</span></h2>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]}/>
        </div>
        <label>{error}</label>
        <div className="buttons">
          <button>Cancelar</button>
          <button onClick={alert}>Entrar</button>
        </div>
      </div>
    </section>
  );
};

export default App;
