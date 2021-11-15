const PostForm = () => {
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