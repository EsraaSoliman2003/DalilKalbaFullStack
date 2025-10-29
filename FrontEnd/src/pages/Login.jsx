import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { API } from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await API.loginAdmin({
        Username: username,
        Password: password,
      });
      localStorage.setItem("token", data.Token);
      localStorage.setItem("expiresAt", data.ExpiresAt);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>تسجيل الدخول</h2>

        <label>اسم المستخدم</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin username"
          required
        />

        <label>كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">تسجيل الدخول</button>
      </form>
    </div>
  );
};

export default Login;
