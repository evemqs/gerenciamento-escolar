import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginUsuario/App.css";
import Button from "../../components/Button/App.css";
import Input from "../../components/Input/App.css";

const App = () => {
  const [formData, setFormData] = useState({ cpf: "", senha: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatCpf = (value) => {
    const cpf = value.replace(/\D/g, "").slice(0, 11);
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cpf" ? formatCpf(value) : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Adiciona preventDefault para evitar o comportamento padrão do formulário

    const { cpf, senha } = formData;
    if (!cpf || !senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setError("CPF inválido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/get/users", { // Adiciona http:// ao URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, senha }),
      });

      const result = await response.json();

      if (response.ok) {
        // Supondo que o backend retorne um token ou similar
        localStorage.setItem("authToken", result.token);
        navigate("/Home");
      } else {
        setError(result.message || "Erro no login. Tente novamente.");
      }
    } catch (error) {
      setError("Erro na comunicação com o servidor. Tente novamente.");
    }
  };

  return (
    <section className="container-login">
      <div className="form-login">
        <h1>Seja bem-vindo!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <h2>CPF<span>*</span></h2>
            <input type="text" name="cpf" placeholder="Digite seu CPF" value={formData.cpf} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>Senha<span>*</span></h2>
            <input type="password" name="senha" placeholder="Digite sua senha" value={formData.senha} onChange={handleChange}/>
          </div>
          {error && <label className="error-message">{error}</label>}
          <button className="button-login" type="submit">Entrar</button>
        </form>
        <p>Não possui conta? <Link to="/CadastroUsuario">Cadastre-se!</Link></p>
      </div>
    </section>
  );
};

export default App;