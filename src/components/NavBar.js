import { Link } from "react-router-dom"

const NavBar = (props) => {

    return (
        <div id="nav-bar">
            <Link to="/create" state={{ currentToken: props.currentToken}} className="nav-links">
                <span>Create Post</span>
            </Link>
            <Link to="/panel" state={{ currentToken: props.currentToken}} className="nav-links">
                <span>Admin Panel</span>
            </Link>
        </div>
    )
}

export default NavBar