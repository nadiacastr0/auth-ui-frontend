import React, { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import "../../assets/style.css";

export function Register() {
  const { register, error } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [profiles, setProfiles] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await register(name, email, password, cpf, profiles);
  };

  const handleProfileToggle = (role: string) => {
    setProfiles((prevProfiles) =>
      prevProfiles.includes(role)
        ? prevProfiles.filter((p) => p !== role)
        : [...prevProfiles, role]
    );
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            CPF:
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </label>

          <fieldset className="checkbox-group">
            <legend>Perfil:</legend>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={profiles.includes("ROLE_ADMINISTRATOR")}
                onChange={() => handleProfileToggle("ROLE_ADMINISTRATOR")}
              />
              <span>Admin</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={profiles.includes("ROLE_CUSTOMER")}
                onChange={() => handleProfileToggle("ROLE_CUSTOMER")}
              />
              <span>Usuário</span>
            </label>
          </fieldset>
          <button type="submit">Registrar</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

