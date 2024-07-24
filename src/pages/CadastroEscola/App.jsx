import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CadastroEscola/App.css";

const App = () => {
  const [escolas, setEscolas] = useState([]);
  const navigate = useNavigate();

  const addEscola = (escola) => {
    setEscolas((prevEscolas) => [...prevEscolas, escola]);
  };

  const SchoolForm = ({ addEscola }) => {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!nome || !endereco) {
        setError("Nome e endereço são obrigatórios.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/cadastrar/school", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, endereco }),
        });

        const result = await response.json();

        if (response.ok) {
          addEscola({ nome, endereco });
          setNome("");
          setEndereco("");
          setError("");
          alert("Escola cadastrada com sucesso!");
        } else {
          setError(result.message || "Erro no cadastro. Tente novamente.");
        }
      } catch (error) {
        setError("Erro na comunicação com o servidor. Tente novamente.");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <section className="form-escolas">
          <div>
            <h2>Nome<span>*</span></h2>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
          </div>
          <div>
            <h2>Endereço<span>*</span></h2>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
          </div>
        </section>
        <div className="flex">
          <label>{error}</label>
          <div className="buttons-flex">
            <button className="button-cancel" type="button" onClick={() => navigate(-1)}>Voltar</button>
            <button className="button-cadastro" type="submit">Cadastrar</button>
          </div>
        </div>
      </form>
    );
  };

  const SchoolList = ({ escolas }) => {
    return (
      <section className="container-lista">
        <h1>Escolas Cadastradas</h1>
        <ul>
          {escolas.map((escola, index) => (
            <li key={index}>
              <strong>Nome:</strong> {escola.nome} <strong>Endereço:</strong> {escola.endereco}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <section id="container">
      <div className="container">
        <h1>Cadastro de Escolas</h1>
        <SchoolForm addEscola={addEscola} />
        <SchoolList escolas={escolas} />
      </div>
    </section>
  );
};

export default App;