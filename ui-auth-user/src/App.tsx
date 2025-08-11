import "./App.css";
import { UserTable } from "./components/admin/UserTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/Login";
import HomePage from "./components/Home/Home";
import { Register } from "./components/auth/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;