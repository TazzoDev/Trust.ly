import { useEffect, useState } from "react"
import { getPostbyId, getUser, updateRequest } from "../firebase"
import { AcceptRequestIcon, ChatIcon, DenyRequestIcon } from "../assets/icons"
import { Link } from "react-router-dom"



export default function RequestTile({request}){

    //console.log(request)

    const [data , setData] = useState({
        clientFirstName: '',
        clientLastName: '',
        clientPhotoUrl: '',
        description: request.description,
        startTime: '',
        endTime: '',
        status: request.status,
        postTitle: '',
    })

    useEffect(() => {
        async function fetchData(){
            const client = await getUser(request.clientId)
            const post = await getPostbyId(request.postId)

            const start = request.startTime.toDate()
            const end = request.endTime.toDate()

            setData(oldData => ({
                ...oldData,
                clientFirstName: client.firstName,
                clientLastName: client.lastName,
                clientPhotoUrl: client.photoUrl,
                postTitle: post.title,
                startTime: start.toString(),
                endTime: end.toString(),
            }))
        }
        
        fetchData()
    },[])

    async function handleChangeStatus(newStatus){
        await updateRequest(request.requestId, {status: newStatus})
        window.location.reload()
    }

    //console.log(request.startTime.nanoseconds)

    return (
        <div className="request">
            <div className="request-data">
                <div className="request-data--user-info">
                    <img src={data.clientPhotoUrl} alt="client avatar"/>
                    <section>
                        <h3>{data.clientFirstName} {data.clientLastName}</h3>
                        <Link to={`/${request.postId}`}><u>{data.postTitle}</u></Link>
                        <p className="request-dates">From: {data.startTime} <br />To: {data.endTime}</p>
                        <section className="request-description">
                            {data.description}
                        </section>
                    </section>
                </div>
                <div className="request-data--status">
                    <b>Status: <span className={data.status}>{data.status}</span></b>
                        <div className="status--button-row">
                            {/*add functionality*/}
                            {data.status === 'pending' &&
                            <>
                                <button onClick={() => handleChangeStatus('accepted')}><AcceptRequestIcon /></button>
                                <button onClick={() => handleChangeStatus('denied')}><DenyRequestIcon /></button>
                            </>
                            }
                            <ChatIcon />
                        </div>
                </div>
            </div>
            
        </div>
    )
}