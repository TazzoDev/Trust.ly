import RequestTile from "../../components/RequestTile"
import { getRequestsByWorkerId } from "../../firebase"
import { useOutletContext } from "react-router-dom"

export default function RequestsHistory(){

    const data = useOutletContext()

    const requestElements = data.map(req => <RequestTile request={req} key={req.requestId}/>)


    return(
        <>
            <h2>History</h2>
            {requestElements}
        </>
    )
}