import { Navigate, useLocation } from "react-router"

const PostForm = () => {
    const location = useLocation();
    let token;
    if (location.state === null) {
        <Navigate to="/" />
    } else {
        token = location.state.currentToken;
    }
    console.log(token)

    return(
        <form action="http://127.0.0.1:5000/api/posts" method="POST">
            <label htmlFor="title" /> Title:
            <input type="text" required={true} name="title" />
            <label htmlFor="text" /> Text:
            <textarea required={true} name="text"></textarea>
            <button type="submit">Submit</button>
        </form>
    )
}

export default PostForm