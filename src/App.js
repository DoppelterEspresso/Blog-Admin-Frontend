import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [token, setToken] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let data = {};
      data.username = document.getElementById("username").value;
      data.password = document.getElementById("password").value;
      fetch("http://127.0.0.1:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => setToken(result.token))
        .catch(e => window.alert("Incorrect Password or Username"))
    })
  }, [])


  return (
    <div id="login-container">
      <h1>Log in</h1>
      <form action="http://127.0.0.1:5000/api/users" method="POST" id="login-form">
        <div className="form-element">
          <label htmlFor="username" />
          <input type="text" required={true} placeholder="Username" name="username" id="username" />
        </div>
        <div className="form-element">
          <label htmlFor="password" />
          <input type="password" required={true} placeholder="Password" name="password" id="password" />
        </div>
        <input type="hidden" name="adminUrl" value={window.location.href} />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      { token.length ? navigate("/panel", { state: { currentToken: token } }) : null }
    </div>
  );
}

export default App;
