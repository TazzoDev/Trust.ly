import { redirect } from "react-router-dom"
import SearchBar from "../components/SearchBar"


export default function Home(){


   

    return (
        <div className="home-page">
            <div className="home-page--background">
                <img src="src/assets/images/home1.png" className="home-page--image1" />
                <img src="src/assets/images/home2.png" className="home-page--image2" />
                <img src="src/assets/images/home3.png" className="home-page--image3" />
            </div>
            <h1>Encuentra <span className="literata">expertos</span>, contrata <br/>con <span className="literata">confianza</span>.</h1>
            <SearchBar />
        </div>
    )
}