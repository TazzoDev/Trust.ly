

import { useEffect, useState } from "react"
import { useAuth } from "../../authContext"
import { PostTab } from "../../components/PostTab"
import { getPostsByUserId } from "../../firebase"
import { Link, NavLink, Outlet } from "react-router-dom"



export default function Profile(){

    const { currentUser, loading } = useAuth()

    if(loading) return <p>Loading...</p>

    return (
        <div className="profile-page page">
            {currentUser ?
                <div className="profile-container">
                    <div className="profile-info">
                        <img  className='profile--profile-photo' src={currentUser.photoUrl ? currentUser.photoUrl : "https://placehold.co/180"}/>
                        <h3>{currentUser.firstName} {currentUser.lastName}</h3>
                        <p>{currentUser.email}</p>
                        <Link to='/edit-profile'>Edit</Link>
                        <hr/>
                        <section className="profile-info--stats">
                            <ul>
                                { currentUser.location?.country && <li><span>Location</span><b>{currentUser.location.city}, {currentUser.location.country}</b></li>}
                                <li><span>Member since</span><b>Aug 2021</b></li>
                            </ul>
                        </section>
                        <hr/>
                        <section className="profile-info--bio">
                            <p>
                                {currentUser.bio}
                            </p>
                        </section>

                    </div>
                    { currentUser.accountType === 'worker' 
                    ?   <div className="profile-assets">
                            <div className="profile-tabs">
                                <NavLink to="." end className={({isActive}) => isActive ? 'profile-tab active-tab' : 'profile-tab'}>Jobs</NavLink>
                                <NavLink to="photos" className={({isActive}) => isActive ? 'profile-tab active-tab' : 'profile-tab'}>Photos</NavLink>
                                <NavLink to="reviews" className={({isActive}) => isActive ? 'profile-tab active-tab' : 'profile-tab'}>Reviews</NavLink>
                            </div>
                            <Outlet />
                        </div>
                    : ''
                    }
                </div>
                : <p>Not logged in.</p>
            }
        </div>
    )
}

export function ProfilePosts(){

    const {currentUser} = useAuth()
    const [posts, setPosts] = useState([])

    useEffect(() => {

        async function fetchPosts(){
            const p = await getPostsByUserId(currentUser.id)
            setPosts(p)
        }

        fetchPosts()
    },[])

    function handleAdd(){
        
    }

    const postElements = posts.map( post => {
        return (
            <Link to={`/${post.id}`} key={post.id} ><PostTab post={post} /></Link>
        )
    })
    

    return(
        <div className="profile-posts">
            <div className="profile-posts--header">
                <Link className="add-button" to='/new-post'>Add</Link>
            </div>
            {posts.length > 0
            ? 
            <div className="posts-container">
                {postElements}
            </div>
            : 
            <h3>There is no posts yet!</h3>
            }

        </div>
    )
}