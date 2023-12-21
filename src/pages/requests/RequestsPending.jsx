import { useOutletContext } from "react-router-dom"
import { filterRequestsByStatus } from "../../utils"
import RequestTile from "../../components/RequestTile"

export default function RequestsPending(){

    const data = useOutletContext()
    
    const pendingRequests = filterRequestsByStatus('pending', data)

    const requestElements = pendingRequests.map(req => <RequestTile request={req} key={req.requestId}/>)

    return(
        <>
        <h2>Pending requests</h2>
        {requestElements}
        </>
    )
}