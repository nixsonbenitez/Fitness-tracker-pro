import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router"

//New imports here is usenavigate and Link, these two will be used in the Register function
//useNavigate here lets the url sit inside the function and when they are register it will take them to the activities which 
// were defined in NavBar


/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);
    

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/")
    } catch (e) {
      setError(e.message);
    }
  };

  // When the user is register successfully the navigate
  // will fire when the username and password is successful

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/login">
        Already have an account? Log in here.
      </Link>
    </>
  );
}
