import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { deletePost, getPostbyId, updatePost, uploadPostPhotos } from "../../firebase"
import { useAuth } from "../../authContext"


export default function PostEdit(){

    const {currentUser} = useAuth()

    const [postInfo, setPostInfo] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        photosUrl: []
    })
    const [photos, setPhotos] = useState([])

    const params = useParams()
    const nav = useNavigate()
    

    useEffect(() => {

        async function fetchPostInfo(){
            const postId = params.postId
            const post = await getPostbyId(postId)
            setPostInfo({...post});
        }

        fetchPostInfo()
        

    },[params.postId])

    function handleChange(event){
        const {name, value} = event.target
        setPostInfo(oldInfo => ({
            ...oldInfo,
            [name]: value
        }))
    }

    async function handlePhotos(event){
        if(currentUser?.id === postInfo.userId){
            setPhotos(Array.from(event.target.files))
            
            const urls = await uploadPostPhotos(params.postId, event.target.files)
            
            setPostInfo(oldInfo => {
                return{
                    ...oldInfo,
                    photosUrl: urls
                }
            })
        }
    }

    async function handleSave(e){
        e.preventDefault()
        if(currentUser?.id === postInfo.userId){
            await updatePost(params.postId, postInfo)
        }
    }

    async function handleDelete(){
        if(currentUser?.id === postInfo.userId){
            await deletePost(params.postId)
        }
    }

    return (
        <div className="post-edit page">
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
            </form>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="delete-button" onClick={handleDelete}>Delete post</button>
        </div>
    )
}