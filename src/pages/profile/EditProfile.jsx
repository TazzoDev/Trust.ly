import { useState, useEffect } from "react"
import { useAuth } from "../../authContext"
import { updateUser, uploadProfilePhoto } from "../../firebase"
import { useNavigate } from "react-router-dom"


export default function EditProfile(){

    const { currentUser, loading } = useAuth()
    const [ userInfo, setUserInfo ] = useState({
        email: '',
        firstName: '',
        lastName: '',
        photoUrl: '',
        accountType: '',
        bio: '',
        location: {
            city: '',
            country: ''
        }
    })
    const [photo, setPhoto] = useState(null)

    const nav = useNavigate()

    useEffect(() => {
        if (currentUser) {
          // Actualizar el estado solo si currentUser no es nulo
          setUserInfo((oldInfo) => ({
            ...oldInfo,
            email: currentUser.email || '',
            firstName: currentUser.firstName || '',
            lastName: currentUser.lastName || '',
            accountType: currentUser.accountType || '',
            bio: currentUser.bio || '',
            location: {
            ...oldInfo.location,
              city: currentUser.location?.city || '',
              country: currentUser.location?.country || ''
            },
            photoUrl: currentUser.photoUrl
          }));
          setPhoto(currentUser.photoUrl)
        }
    }, [currentUser]);
    
    function handleChange(event) {
        const { name, value } = event.target;
    
        setUserInfo(oldInfo => {
            if(name === "city" || name === "country"){
               return {
                    ...oldInfo,
                    location: {
                        ...oldInfo.location,
                        [name]: value
                    }
               }
            }
            else return {
                    ...oldInfo,
                    [name]: value,
            }
            
        })
    }

    async function handlePhoto(event){
        const url = await uploadProfilePhoto(currentUser.id, event.target.files[0])
        setUserInfo( oldInfo => {
            return {
                ...oldInfo,
                photoUrl: url
            }
        })
        setPhoto(url)
    }

    async function handleSubmit(event){
        event.preventDefault()
        const res = await updateUser(currentUser.id, userInfo)
        nav('/profile')
    }

    if(loading) return <p>loading...</p>

    return (
        <div className="profile-edit page">
            <form>
                <label>
                    First Name: 
                    <input
                        type="text"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Last Name: 
                    <input
                        type="text"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Profile photo:
                    {photo && <img src={photo} />}
                    <input
                        name="photo"
                        type="file"
                        placeholder="profile photo"
                        onChange={handlePhoto}
                    />
                </label>
                <br />
                <label>
                    Email: 
                    <input
                        type="text"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Location:
                    <input
                        type="text"
                        name="city"
                        value={userInfo.location?.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        name="country"
                        value={userInfo.location?.country}
                        onChange={handleChange}
                        placeholder="Country"
                    />
                </label>
                <br />
                <label>
                    Bio: 
                    <textarea
                        name="bio"
                        value={userInfo.bio}
                        placeholder="Tell us about yourself..."
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button  className="save-button" onClick={handleSubmit} >Save</button>
            </form>
        </div>
    )
}