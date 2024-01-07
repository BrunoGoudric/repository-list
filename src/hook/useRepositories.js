import { useState, useEffect } from "react";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState(() => {
    const repoStorage = localStorage.getItem("repos");
    return repoStorage ? JSON.parse(repoStorage) : [];
  });

  useEffect(() => {
    // Obtém os repositórios do armazenamento local ao inicializar o componente
    const repoStorage = localStorage.getItem("repos");

    if (repoStorage) {
      setRepositories(JSON.parse(repoStorage));
    }
  }, []);

  useEffect(() => {
    // Atualiza o armazenamento local sempre que a lista de repositórios é modificada
    localStorage.setItem("repos", JSON.stringify(repositories));
  }, [repositories]);

  // Adiciona um novo repositório à lista
  const addRepository = (repository) => {
    setRepositories([...repositories, repository]);
  };

  // Remove um repositório da lista
  const removeRepository = (repositoryName) => {

    const updatedRepositories = repositories.filter(
      (repo) => repo.name !== repositoryName
    );
    setRepositories(updatedRepositories);
  };

  // Retorna o estado e as funções relevantes
  return { repositories, addRepository, removeRepository };
};
