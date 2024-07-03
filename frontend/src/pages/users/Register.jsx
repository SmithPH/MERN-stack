import { useContext, useState } from "react";
import Alert from "../../Components/Alert";
import { registerUser } from "../../controllers/usersController";
import Success from "../../Components/Success";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Use user context
  const { setUser } = useContext(UserContext);

  // Use navigate hook
  const navigate = useNavigate();

  // Error state
  let [error, setError] = useState(null);

  // Success state
  let [success, setSuccess] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    //   console.log(formData)
    try {
      // register
      const data = await registerUser(
        formData.email,
        formData.password,
        formData.passwordConfirm
      );
      setSuccess("Successfully registered!");
      // setSuccess(data.success);
      setError(null);

      // update user state
      setUser({ email: formData.email, posts: [] });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <>
      <section className="card">
        <h1 className="title">Create a new account</h1>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email Address"
            className="input"
            autoFocus
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={formData.passwordConfirm}
            onChange={(e) =>
              setFormData({ ...formData, passwordConfirm: e.target.value })
            }
          />
          <button className="btn">Register</button>
        </form>

        {error && <Alert msg={error} />}
        {success && <Success msg={success} />}
      </section>
    </>
  );
};

export default Register;
