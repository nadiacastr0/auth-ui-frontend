import axios from "axios";

export const ProfileEnum = {
    ROLE_CUSTOMER: "ROLE_CUSTOMER",
    ROLE_ADMINISTRATOR: "ROLE_ADMINISTRATOR",
}

const API_URL = "http://localhost:8080";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  profiles: (typeof ProfileEnum)[keyof typeof ProfileEnum][];
}

export interface AuthResponse {
  token: string;
  email: string;
  profiles: (typeof ProfileEnum)[keyof typeof ProfileEnum][];
}

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profiles: (typeof ProfileEnum)[keyof typeof ProfileEnum][];
}


export async function getAllUsers(token: string): Promise<User[]> {
    const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteUser(token: string, userId: string): Promise<void> {
  await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
}

export async function login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
}

export async function changePassword(data: {
  email: string;
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await axios.post(`${API_URL}/auth/change-password`, data);
}