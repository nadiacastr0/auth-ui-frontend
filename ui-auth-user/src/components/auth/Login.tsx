import React, { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../assets/style.css";

const LoginPage: React.FC = () => {
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const { login: handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const profiles: string[] = await handleLogin(email, password);
      if (profiles.includes("ROLE_ADMINISTRATOR")) {
        navigate("/users");
      } else {
        navigate("/home");
      }
    } catch {
      alert("Erro ao fazer login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={({ target: { value } }) => setEmailState(value)}
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPasswordState(value)}
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
        <button type="button" onClick={() => navigate("/register")}>
          Registrar-se
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
