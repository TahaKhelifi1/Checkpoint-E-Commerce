import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/api/user";
import { useNavigate } from "react-router";

interface DecodedToken {
  id: string;
  username: string;
  role: "admin" | "user";
  exp: number;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const response : any  = await login(username, password)
      const token = response.data.token
      localStorage.setItem("token", token)

      const decoded : DecodedToken = jwtDecode(token)
      setRole(decoded.role)
      if (decoded.role == "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch {
      alert("invalid credentials")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
