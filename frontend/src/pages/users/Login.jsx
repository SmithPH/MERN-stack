import { useContext, useState } from "react";
import Alert from "../../Components/Alert";
import { loginUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Use user context
  const { setUser } = useContext(UserContext);
  // console.log(user);

  // Use navigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle login
  // *************************
  // go to vite.config.js to set the backend server
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password)

    try {
      // login user
      await loginUser(email, password);

      // update user state
      setUser({email, posts:[]})

      // Navigate to dashboard
      navigate("/dashboard")
    } catch (error) {
      setError(error.message); // from Throw Error in userController.js
    }
  };

  return (
      <section className="card">
        <h1 className="title">Login to your account</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            className="input"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn">Login</button>
        </form>

        {error && <Alert msg={error} />}
      </section>
  );
};

export default Login;
