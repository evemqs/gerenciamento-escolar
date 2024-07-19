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
  };
  
  const alert = () => {
    if (!cpf || !senha) {
      setError("Preencha todos os campos obrigatórios.")
      return;
    }


    const res = loginUsuario(cpf, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("../Home");
  };

  return (
    <section className="container-login">
      <div className="form-container">
        <h1>Seja bem vindo!</h1>
        <div className="form">
          <h2>CPF<span>*</span></h2>
          <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={handleCpfChange}/>
        </div>
        <div className="form">
          <h2>Senha<span>*</span></h2>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]}/>
        </div>
        <label>{error}</label>
        <button onClick={alert}>Entrar</button>
        <p>Não possui conta? <Link to="/CadastroUsuario">Cadastre-se!</Link></p>
      </div>
    </section>
  );
};

export default App;