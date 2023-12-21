import { Link, useLoaderData} from "react-router-dom"
import { getPostbyId, getUser } from "../../firebase"
import { EditIcon, StarIcon } from "../../assets/icons"
import { useAuth } from "../../authContext"
import Carousel from "../../components/carousel"
import { useState } from "react"
import BookingForm from "../../components/BookingForm"


export async function loader({ params }){
    const p = await getPostbyId(params.postId)
    const u = await getUser(p.userId)
    const postPhotos = p.photosUrl?.map(url => ({original: url}))
    return {
        user: {...u},
        post: {...p, id: params.postId},
        postPhotos: postPhotos

    }
}

export default function Post(){

    const {user, post, postPhotos} = useLoaderData()

    const [bookingForm, setBookingForm] = useState(false)

    const {currentUser} = useAuth()

   function handleBook(){
        setBookingForm(b => !b)
   }

    return (
        <div className="post-page page">
            { bookingForm && 
                <BookingForm />
            }
            <div className="post-container">
                <h2 className="post--title">{post.title}<span className="post--rating"><StarIcon />{post.rating}</span></h2>
                <div className="post--user-info">
                    <img src={user.photoUrl ? user.photoUrl : 'https://placehold.co/80x80'} className="profile-photo" />
                    <b>{user.firstName} {user.lastName}</b>
                </div>
                {postPhotos && <Carousel images={postPhotos}/>}
                <p>{post.description}</p>
            </div>
            <section className="right-container">
                <div className="post--user-edit">
                    {currentUser?.id === user.id 
                    ? <Link to={`/edit-post/${post.id}`}><span><EditIcon /></span>Edit</Link> 
                    : ''}
                </div>
                <div className="booking-container">
                    <b>${post.price}/h</b>
                    <p>Save up to 20% with <i>Subscribe</i></p>
                    <Link onClick={handleBook} >Book</Link>
                </div>
                <div className="contact-me--container">
                    <b>Any questions? ⬇️</b>
                    <Link className="contact-me--button">Contact me</Link>
                </div>
            </section>
        </div>
    )
}