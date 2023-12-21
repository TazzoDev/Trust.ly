import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../authContext";
import { useEffect, useState } from "react";
import { getRequestsByWorkerId } from "../../firebase";

export default function RequestsLayout(){

    const [requests, setRequests] = useState([])

    const {currentUser} = useAuth()

    useEffect(() => {
        async function fetchRequests(){
            if(currentUser){
                const req = await getRequestsByWorkerId(currentUser.id)
                setRequests(req)
            }   
        }

        fetchRequests()
    },[currentUser])

    return(
        <div className="requests-page page">
            <h2>Requests</h2>
            <nav>
                <NavLink to='.' end className={({isActive}) => isActive ? 'profile-tab active-tab' : 'profile-tab'} >
                    Accepted
                </NavLink>
                <NavLink to='pending' className={({isActive}) => isActive ? 'profile-tab active-tab' : 'profile-tab'} >
                    Pending
                </NavLink>
                <NavLink to='history' className={({isActive}) => isActive ? 'profile-tab active-tab' : 'profile-tab'} >
                    History
                </NavLink>
            </nav>
            <Outlet context={requests}/>
        </div>
    )
}
