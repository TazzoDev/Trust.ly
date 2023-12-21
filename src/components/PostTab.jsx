import { Link } from "react-router-dom";
import { StarIcon } from "../assets/icons";

export function PostTab({post}){
    return(
        <div className="post-tab">
                <div className="post-tab--img-container" >
                    <img className='post-tab--img' src={post.photosUrl ? post.photosUrl[0] : 'https://placehold.co/240x110'}/>
                </div>
                <section className="post-tab--info">
                    <b className="post-tab--title">{post.title}</b>
                    <p className="post-tab--category">{post.category}</p>
                    <div className="post-tab--info--stats">
                        <p><StarIcon />{post.rating}</p>
                        <p>$<b>{post.price}</b>/h</p>
                    </div>
                </section>
         </div>   
    )
}