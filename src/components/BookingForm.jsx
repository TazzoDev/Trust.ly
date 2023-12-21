import { useEffect, useState } from "react"
import { useAuth } from "../authContext"
import { useParams } from "react-router-dom"
import { getUserByPostId, hasRequested } from "../utils"
import { createJobRequest } from "../firebase"
//datetime input import
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function BookingForm(){

    const [bookingData, setBookingData] = useState({
        clientId: '',
        workerId: '',
        startTime: '',
        endTime: '',
        postId: '',
        status: '',
        description: '',
    })

    const [dates, setDates] = useState([new Date(Date.now()), new Date(Date.now())])
    const [saveMessage, setSaveMessage] = useState(false)
    const [hasRequestedMsg, setHasRequestedMsg] = useState(false)

    const { currentUser } = useAuth()
    const params = useParams()


    useEffect(() => {

        async function fetchData() {
            try {
                // Llamar a la función asíncrona para obtener el workerId
                const workerId = await getUserByPostId(params.postId);
    
                // Actualizar el estado con los valores obtenidos
                setBookingData(oldData => ({
                    ...oldData,
                    clientId: currentUser.id,
                    workerId: workerId,
                    postId: params.postId,
                    status: 'pending',
                }));
                //setDates([Date.now(), Date.now()])

                if(await hasRequested(currentUser.id, workerId)) setHasRequestedMsg(true)
                
            } catch (error) {
                console.error('Error al obtener el workerId:', error);
                // Manejar el error según sea necesario
            }
        }

       
    
        // Llamar a la función fetchData
        fetchData()

    },[params])

    async function handleSave(){

        if(!hasRequestedMsg){
            const res = await createJobRequest(bookingData)
            if(res){
                setSaveMessage(true)
            }
        }   
    }

    async function handleChange(value){
        setDates(value)
        setBookingData(oldData => ({
            ...oldData,
            startTime: value[0],
            endTime: value[1]
        }))
    }

    async function handleText(event){
        
        setBookingData(oldData => ({
            ...oldData,
            description: event.target.value,
        }))
    }

    //console.log(bookingData)
    //console.log(dates)
    return (
        <div className="booking-form page">
            <h1>Booking</h1>
            <DateTimeRangePicker className='datetime-input'
                value={dates}
                onChange={handleChange}
                clearIcon={null}
                disableClock
                required
            />
            <textarea placeholder="Job Details..." value={bookingData.description} onChange={handleText}/>
            <br />
            <button onClick={handleSave} className="save-button" >Save</button>
            {saveMessage && <p>Request sent! The user will see the request and accept or deny it. <br /> Please be patient</p>}
            {hasRequestedMsg && <p>You have a pending request already!</p>}
        </div>
    )
}