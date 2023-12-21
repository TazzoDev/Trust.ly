import { useOutletContext } from "react-router-dom"
import { filterRequestsByStatus } from "../../utils"
import RequestTile from "../../components/RequestTile"


export default function RequestsAccepted(){

    const data = useOutletContext()
    
    const acceptedRequests = filterRequestsByStatus('accepted', data)

    const requestElements = acceptedRequests.map(req => <RequestTile request={req} key={req.requestId}/>)


    return(
        <>
        <h2>Accepted Requests</h2>
        {requestElements}
        </>
    )
}
