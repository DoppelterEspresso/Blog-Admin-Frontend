import './App.css';

function App() {
  return (
    <div>
      <h1>Log in</h1>
      <form action="http://127.0.0.1:5000/api/users" method="POST">
        <label for="username" /> Username
        <input type="text" required="true" name="username" />
        <label for="password" /> Password
        <input type="password" required="true" name="password" />
        <input type="hidden" name="adminUrl" value={window.location.href} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
