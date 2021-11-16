import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Panel = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    let navigate = useNavigate();
    let token;
    if (location.state === null) {
        navigate("/");
    } else {
        token = location.state.currentToken;
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/posts")
            .then(response => response.json())
            .then(result => setPosts(result))
            .catch(err => console.log(err))
    }, [])

    let postList = [];
    
    for (let post of posts) {
        postList.push(
            <Link to={`/posts/${post._id}`} state={{ currentToken: token}}>
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                    <span>Published: {post.published ? "True" : "false"}</span>
                </div>
            </Link>
        )
    }

    return(
        <div>
            {postList}
        </div>
    )
}

export default Panel;