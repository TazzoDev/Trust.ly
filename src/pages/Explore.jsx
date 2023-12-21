
import { PostTab } from "../components/PostTab"
import SearchRow from "../components/SearchRow"
import { getPosts } from "../firebase"
import { Link, useLoaderData} from "react-router-dom"
import { useEffect, useState } from "react"

export async function loader(){
    const p = await getPosts()
    return p
}

export default function Explore(){

    const allPosts = useLoaderData();
    const [filteredPosts, setFilteredPosts] = useState(allPosts);
    const [filters, setFilters] = useState({});

   
    const handleFilterChange = (filterKey, value) => {
        // Actualiza el estado de los filtros
        setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
    }

    useEffect(() => {
        const filtered = applyFilters(allPosts, filters)
        setFilteredPosts(filtered)
    },[filters])

    const applyFilters = (posts, filters) => {
        // Implementa lógica para aplicar los filtros a los posts
        // Puedes ajustar esto según tus necesidades
        
        return posts.filter((post) => {
          if (filters.category && post.category !== filters.category ) {
            return false;
          }
          if (filters.price && parseInt(post.price) > parseInt(filters.price) ) {
            return false;
          }
          return true;
        })
    }


    const postElements = filteredPosts.map(post => <Link to={`${post.id}`} key={post.id} ><PostTab post={post}  /></Link>)

    console.log(filters)

    return (
        <div className="explore-page page">
            <h2>Explore</h2>
            <SearchRow onFilterChange={handleFilterChange}/>
            <div className="posts-container">
                {postElements}
            </div>
        </div>
    )
}

