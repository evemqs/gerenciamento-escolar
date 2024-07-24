import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CadastroAluno/App.css";

const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    professorId: "",
  });
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await fetch("http://localhost:3001/get/teachers");
        const professores = await response.json();
        setProfessores(professores);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
      }
    };
    fetchProfessores();
  }, []);

  const formatCpf = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
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
    const { nome, cpf, dataNascimento, professorId } = formData;

    if (!nome || !cpf || !dataNascimento || !professorId) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setError("CPF inválido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/cadastrar/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, dataNascimento, professorId }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.message || "Erro no cadastro. Tente novamente.");
        return;
      }

      // Adicionar aluno à lista
      const aluno = await response.json();
      setAlunos([...alunos, aluno]);
      alert("Aluno cadastrado com sucesso!");
      setFormData({ nome: "", cpf: "", dataNascimento: "", professorId: "" });
    } catch (error) {
      setError("Erro na comunicação com o servidor. Tente novamente.");
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const AlunoList = ({ alunos }) => {
    return (
      <section className="container-lista">
        <h1>Alunos Cadastrados</h1>
        <ul>
          {alunos.map((aluno, index) => (
            <li key={index}>
              <strong>Nome:</strong> {aluno.nome} <strong>CPF:</strong> {aluno.cpf} <strong>Data de Nascimento:</strong> {formatDate(aluno.dataNascimento)} <strong>Professor:</strong> {professores.find((prof) => prof.id === aluno.professorId)?.nome}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <section id="container">
      <div className="container">
        <h1>Cadastro de Alunos</h1>
        <form onSubmit={handleSubmit}>
          <section className="form-alunos">
            <div>
              <h2>Nome<span>*</span></h2>
              <input type="text" name="nome" placeholder="Digite o nome do aluno" value={formData.nome} onChange={handleChange} />
            </div>
            <div>
              <h2>CPF<span>*</span></h2>
              <input type="text" name="cpf" placeholder="Digite o CPF do aluno" value={formData.cpf} onChange={handleChange} />
            </div>
            <div>
              <h2>Data de Nascimento<span>*</span></h2>
              <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
            </div>
            <div>
              <h2>Professor<span>*</span></h2>
              <select name="professorId" value={formData.professorId} onChange={handleChange}>
                <option value="">Selecione um professor</option>
                {professores.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.nome}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <div className="flex">
            <label>{error}</label>
            <div className="buttons-flex">
              <button className="button-cancel" onClick={() => navigate(-1)}>Voltar</button>
              <button className="button-cadastro" type="submit">Cadastrar</button>
            </div>
          </div>
        </form>
        <AlunoList alunos={alunos} />
      </div>
    </section>
  );
};

export default App;