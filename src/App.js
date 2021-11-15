import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [token, setToken] = useState([]);

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
    })
  }, [])

  console.log(token)
  
  return (
    <div>
      <h1>Log in</h1>
      <form action="http://127.0.0.1:5000/api/users" method="POST">
        <label htmlFor="username" /> Username
        <input type="text" required={true} name="username" id="username" />
        <label htmlFor="password" /> Password
        <input type="password" required={true} name="password" id="password" />
        <input type="hidden" name="adminUrl" value={window.location.href} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
