import { Link } from "react-router-dom"
import { MenuIcon } from "../assets/icons"
import { useAuth } from "../authContext"



export default function NavBar(){

    const {currentUser} = useAuth()

    return (
        <nav className="nav-bar">
            <div className="nav-bar--tabs">
                <NavBarLogo />
                <NavBarTab text={"Explore"} route={'/explore'}/>
                <NavBarTab text={"About us"} route={'/about-us'}/>
            </div>
            <SearchBar />

        </nav>
    )
}

function NavBarLogo(){
    return (
        <Link to='/' className="nav-bar--logo">
            <div>
                <h1>Trust.ly</h1>
            </div>
        </Link>
    )
}

function NavBarTab({text, route}){
    return (
        <Link className="nav-bar--tab" to={route}>
            {text}
        </Link>
    )
}

function SearchBar(){
    return (
        <div className="nav-bar--searchbar">

        </div>
    )
}