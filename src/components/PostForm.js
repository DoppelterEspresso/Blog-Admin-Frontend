import { useLocation, useNavigate } from "react-router"
import { useEffect } from "react";
import NavBar from "./NavBar";

const PostForm = () => {
    const location = useLocation();
    let navigate = useNavigate();
    let token;
    if (location.state === null) {
        navigate("/");
    } else {
        console.log(location)
        token = location.state.currentToken;
    }

    useEffect(() => {
        const form = document.getElementsByTagName("form")[0];
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          let data = {};
          data.title = document.getElementById("title").value
          data.text = document.getElementById("text").value
          data.panelUrl = document.getElementById("panelUrl").value
          fetch("http://127.0.0.1:5000/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(result => {
                console.log(result.message)
                if (result.message && result.message === "Success") {
                    window.alert("Post created!");
                }
            })
            .catch(e => console.log(e))
        })
      }, [])


    return(
        <div>
          <NavBar currentToken={token}/>
          <form action="http://127.0.0.1:5000/api/posts" method="POST">
              <label htmlFor="title" /> Title:
              <input type="text" required={true} name="title" id="title" />
              <label htmlFor="text" /> Text:
              <textarea required={true} name="text" id="text"></textarea>
              <input type="hidden" name="panelUrl" value={window.location.href} id="panelUrl" />
              <button type="submit">Submit</button>
          </form>
        </div>
    )
}

export default PostForm