import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import NavBar from "./NavBar";

const Panel = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState([]);
    const location = useLocation();
    let navigate = useNavigate();

    if (location.state === null && !token.length) {
        console.log("Panel redirects back to login")
        navigate("/");
    } else if (!token.length) {
        setToken(location.state.currentToken);
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/posts", { headers: { "authorization": token }})
            .then(response => response.json())
            .then(result => setPosts(result))
            .catch(err => console.log(err))
    }, [])

    let postList = [];
    
    for (let post of posts) {
        postList.push(
            <Link to={`/posts/${post._id}`} state={{ currentToken: token}} className="post-link">
                <div key={post._id} className="post-container">
                    <h2>{post.title}</h2>
                    <div>{ ReactHtmlParser(post.text) }</div>
                    <span>Published: {post.published ? "True" : "false"}</span>
                </div>
            </Link>
        )
    }

    return(
        <div>
            <NavBar currentToken={token}/>
            <div className="flex-container">
                <div className="all-posts">
                    {postList}
                </div>
            </div>
        </div>
    )
}

export default Panel;