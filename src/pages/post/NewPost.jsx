import { useState } from "react"
import { createPost, updatePost, uploadPostPhotos } from "../../firebase"
import { useAuth } from "../../authContext"

export default function NewPost(){

    const {currentUser} = useAuth()
    const userId = currentUser.id

    const [postInfo, setPostInfo] = useState({
        userId: userId,
        title: '',
        description: '',
        price: '',
        category: '',
        photosUrl: []
    })
    const [photos, setPhotos] = useState([])

    function handleChange(event){
        const {name, value} = event.target
        setPostInfo(oldInfo => ({
            ...oldInfo,
            [name]: value
        }))
    }

    function handlePhotos(e){
        setPhotos(Array.from(e.target.files))
    }

    

    async function handleSave(e){
        e.preventDefault()
        
        const postRef = await createPost(postInfo)
        const postId = postRef.id
        const urls = await uploadPostPhotos(postId, photos)
        
        await updatePost(postId, {...postInfo, photosUrl: urls})
    }

    

    return (
        <div className="new-post page">
            <form>
                <label>
                    Title: 
                    <input
                        type="text"
                        name="title"
                        value={postInfo.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Description: 
                    <textarea
                        type="text"
                        name="description"
                        value={postInfo.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Price: 
                    <input
                        type="number"
                        name="price"
                        value={postInfo.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Category: 
                    <input
                        type="text"
                        name="category"
                        value={postInfo.category}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Images:
                    <input 
                        type="file"
                        name="photos"
                        onChange={handlePhotos}
                        multiple
                    />
                </label>
                <br />
                <button onClick={handleSave}>Save</button>
            </form>
        </div>
    )
}