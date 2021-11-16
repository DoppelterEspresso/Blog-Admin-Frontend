import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { postid } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [update, setUpdate] = useState(false);

    let token;
    if (location.state === null) {
        navigate("/");
    } else {
        token = location.state.currentToken;
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/posts/${postid}`)
            .then(response => response.json())
            .then((result) => {
                setPost(result);
            })
            .catch(err => {
                console.log(err)
            })
        fetch(`http://127.0.0.1:5000/api/posts/${postid}/comments`)
            .then(response => response.json())
            .then((result) => {
                setComments(result);
            })
            .catch(err => {
                console.log(err)
            })
    }, [postid, update])

    const commentDelete = (commentId) => {
        fetch(`http://127.0.0.1:5000/api/posts/${postid}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(response => response.json()).then(result => console.log(result)).catch(err => console.log(err))
        setUpdate(update === false ? true : false);
    }

    let commentList =  [];

    for (let comment of comments) {
        commentList.push(
            <div key={comment._id}>
                <h3>{comment.author}</h3>
                <p>{comment.text}</p>
                <button onClick={() => commentDelete(comment._id)}>DELETE COMMENT</button>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h2>{post.title}</h2>
                <p>{post.text}</p>
                <span>{post.timestamp}</span>
            </div>
            <hr />
            {commentList}
        </div>
    )
}

export default Post;