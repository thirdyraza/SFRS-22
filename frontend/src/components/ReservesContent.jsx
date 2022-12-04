import '../assets/scss/table.scss'
import { useDispatch } from 'react-redux'
import { getReservation } from '../features/reserves/reserveSlice'
import { useNavigate } from 'react-router-dom'

function ReservesContent({reserves}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const gotoDetails = (e) =>{
        e.preventDefault()
    
        const resID = reserves._id
        dispatch(getReservation(resID))
    
        navigate('../details:' + resID)
    }
  
    return (<>
        <div class='info-container' onClick={gotoDetails}>
            <p>{reserves.requestor}</p>
            <p>{reserves.subject}</p>
            <p>{reserves.org}</p>
            <p>{reserves.bldg}</p>
            <p>{reserves.room}</p>
            <p>{reserves.time_in} - {reserves.time_out}</p>
            <p>Approved by: {reserves.status}</p>
        </div>
        </>);
}


export default ReservesContent