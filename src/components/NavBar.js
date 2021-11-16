import { Link } from "react-router-dom"

const NavBar = (props) => {

    return (
        <div>
            <Link to="/create" state={{ currentToken: props.currentToken}}>
                <span>Create Post</span>
            </Link>
            <Link to="/panel" state={{ currentToken: props.currentToken}}>
                <span>Admin Panel</span>
            </Link>
        </div>
    )
}

export default NavBar