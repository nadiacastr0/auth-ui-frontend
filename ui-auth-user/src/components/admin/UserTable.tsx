import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { getAllUsers, ProfileEnum, type User } from "../../api/auth/auth";

export function UserTable() {
  const { token, profiles } = useAuth();
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setFetchError("Usuário não autenticado");
      setLoading(false);
      return;
    }

    if (!profiles.includes(ProfileEnum.ROLE_ADMINISTRATOR)) {
      setFetchError("Acesso negado. Somente administradores podem acessar essa página.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getAllUsers(token);
        setUserList(fetchedUsers);
      } catch (error) {
        setFetchError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, profiles]);

  if (loading) return <p>Carregando usuários...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {userList.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <table border={1} cellPadding={5}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Perfis</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.cpf}</td>
                <td>{user.profiles.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

