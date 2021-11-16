import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import NavBar from "./NavBar";

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { postid } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [token, setToken] = useState([]);
    const [update, setUpdate] = useState(false);

    if (location.state === null && !token.length) {
        console.log("Post redirects to login")
        navigate("/");
    } else if (!token.length) {
        setToken(location.state.currentToken);
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

    const postDelete = () => {
        fetch(`http://127.0.0.1:5000/api/posts/${postid}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(response => response.json()).then(result => result.message === "Failure" ? navigate("/") : navigate("/panel", { state: { currentToken: token } })).catch(err => console.log(err))
        setUpdate(update === false ? true : false)
    }

    const switchPublish = () => {
        fetch(`http://127.0.0.1:5000/api/posts/${postid}`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then(response => response.json()).then(result => result.message === "Failure" ? navigate("/") : navigate("/panel", { state: { currentToken: token } })).catch(err => console.log(err))
        setUpdate(update === false ? true : false)
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
            <NavBar currentToken={token} />
            <div>
                <h2>{post.title}</h2>
                <div>{ReactHtmlParser(post.text)}</div>
                <span>{post.timestamp}</span>
                <div>
                    <button onClick={postDelete}>DELETE POST</button>
                    <button onClick={switchPublish}>{post.published === true ? "UNPUBLISH" : "PUBLISH"}</button>
                </div>
            </div>
            <hr />
            {commentList}
        </div>
    )
}

export default Post;