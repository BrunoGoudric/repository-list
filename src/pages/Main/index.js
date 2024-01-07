import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";

import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";

import { useRepositories }  from "../../hook/useRepositories";

import api from "../../services/api";

function Main() {
  const { repositories, addRepository, removeRepository } = useRepositories();
  const [newRepo, setNewRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setAlert(null);

      try {
        if (newRepo === '') {
          throw new Error("Você precisa indicar um repositório!");
        }

        const response = await api.get(`repos/${newRepo}`);
        const hasRepo = repositories.find(repo => repo.name === newRepo);

        if (hasRepo) {
          throw new Error("Esse repositório já existe!");
        }

        const data = {
          name: response.data.full_name,
        };

        // Adiciona o novo repositório à lista
        addRepository(data);
        setNewRepo("");
      } catch (error) {
        setAlert(true);
        console.log("Error=", error);
      } finally {
        setLoading(false);
      }
    },
    [newRepo, repositories, addRepository]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback((repo) => {
    // Remove o repositório da lista
    removeRepository(repo);
  }, [removeRepository]);



  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton Loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
