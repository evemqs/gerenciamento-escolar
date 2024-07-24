import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CadastroUsuario/App.css";
import Button from "../../components/Button/App.css";
import Input from "../../components/Input/App.css";

const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ cpf: "", nome: "", data: "", senha: "" });
  const [error, setError] = useState("");

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
    e.preventDefault();

    const { cpf, nome, data, senha } = formData;
    if (!cpf || !senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setError("CPF inválido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/cadastrar/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, nome, data, senha }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/Home");
      } else {
        setError(result.message || "Erro no cadastro. Tente novamente.");
      }
    } catch (error) {
      setError("Erro na comunicação com o servidor. Tente novamente.");
    }
  };

  return (
    <section className="container-cadastro">
      <div className="form-cadastro">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <h2>Nome<span>*</span></h2>
            <input type="text" name="nome" placeholder="Digite seu nome" value={formData.nome} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>CPF<span>*</span></h2>
            <input type="text" name="cpf" placeholder="Digite seu CPF" value={formData.cpf} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>Data de nascimento<span>*</span></h2>
            <input type="date" name="data" value={formData.data} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>Senha<span>*</span></h2>
            <input type="password" name="senha" placeholder="Digite sua senha" value={formData.senha} onChange={handleChange}/>
          </div>
          <label>{error}</label>
          <div className="buttons-flex">
            <button className="button-cancel" type="button" onClick={() => navigate(-1)}>Cancelar</button>
            <button className="button-cadastro" type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default App;