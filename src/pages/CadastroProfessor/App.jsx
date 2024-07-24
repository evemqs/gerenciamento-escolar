import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ nome: "", cpf: "", senha: "", dataNascimento: "", escola: "" });
  const [escolas, setEscolas] = useState([]);
  const [error, setError] = useState("");

  // Fetch Escolas
  useEffect(() => {
    const fetchEscolas = async () => {
      try {
        const response = await fetch("http://localhost:3001/get/schools");
        const result = await response.json();
        if (response.ok) {
          setEscolas(result);
        } else {
          setError("Erro ao carregar escolas.");
        }
      } catch (error) {
        setError("Erro na comunicação com o servidor. Tente novamente.");
      }
    };
    fetchEscolas();
  }, []);

  // Format CPF
  const formatCpf = (value) => {
    const cpf = value.replace(/\D/g, "").slice(0, 11);
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cpf" ? formatCpf(value) : value,
    }));
    setError("");
  };

  // Handle Submit
  const handleSubmit = async () => {
    const { nome, cpf, senha, dataNascimento, escola } = formData;
    if (!nome || !cpf || !senha || !dataNascimento || !escola) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setError("CPF inválido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/cadastrar/teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, senha, dataNascimento, escola }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Professor cadastrado com sucesso!");
        navigate("/Home");
      } else {
        setError(result.message || "Erro no cadastro. Tente novamente.");
      }
    } catch (error) {
      setError("Erro na comunicação com o servidor. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section id="container">
        <div className="container">
          <h1>Cadastro de Professores</h1>
          <div className="form">
            <h2>Nome<span>*</span></h2>
            <input type="text" name="nome" placeholder="Digite seu nome" value={formData.nome} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>CPF<span>*</span></h2>
            <input type="text" name="cpf" placeholder="Digite seu CPF" value={formData.cpf} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>Senha<span>*</span></h2>
            <input type="password" name="senha" placeholder="Digite sua senha" value={formData.senha} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>Data de nascimento<span>*</span></h2>
            <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange}/>
          </div>
          <div className="form">
            <h2>Escola<span>*</span></h2>
            <select name="escola" value={formData.escola} onChange={handleChange}>
              <option value="">Selecione uma escola</option>
              {escolas.map((escola) => (
                <option key={escola.id} value={escola.id}>
                  {escola.nome}
                </option>
              ))}
            </select>
          </div>
          <label>{error}</label>
          <div className="flex">
            <div className="buttons-flex">
              <button className="button-cancel" type="button" onClick={() => navigate(-1)}>Voltar</button>
              <button className="button-cadastro" type="submit">Cadastrar</button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default App;