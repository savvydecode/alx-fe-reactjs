
import { Link } from "react-router"
export default function Navbar() {
    return (<nav>
        <Link style={{marginRight: 'auto'}} to={'/'}>GitHub UserSearch</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/contact'}>Contact</Link>
    </nav>)
}