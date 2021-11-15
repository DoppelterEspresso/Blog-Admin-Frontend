import { useEffect, useState } from "react";

const Panel = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/posts")
            .then(response => response.json())
            .then(result => setPosts(result))
            .catch(err => console.log(err))
    }, [])

    let postList = [];
    
    for (let post of posts) {
        postList.push(
            <div key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.text}</p>
                <span>Published: {post.published ? "True" : "false"}</span>
            </div>
        )
    }

    return(
        <div>
            {postList}
        </div>
    )
}

export default Panel;