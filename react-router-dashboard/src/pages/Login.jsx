import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");

    navigate("/profile");
  }

  return (
    <div>
      <h1>Login Page</h1>

      <p>Click below to login.</p>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
