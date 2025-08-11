import { useAuth } from "../../context/auth/AuthContext";
import { UserTable } from "../admin/UserTable";

const HomePage = () => {
  const { profiles } = useAuth();

  return (
    <div>
      {profiles.includes("ROLE_ADMINISTRATOR") ? (
        <div>
            <UserTable />
        </div>
      ) : (
        <h1>Hola Mundo</h1>
      )}
    </div>
  );
};

export default HomePage;