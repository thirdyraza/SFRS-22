import '../assets/scss/table.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getReservation } from '../features/reserves/reserveSlice'
import { useNavigate } from 'react-router-dom'

function ReservesContent({reserves}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
    
    const gotoDetails = (e) =>{
        e.preventDefault()
    
        const resID = reserves._id
        dispatch(getReservation(resID))
    
        navigate('../details:' + resID)
    }

    var role

    if(user.role === 'Faculty' || user.role === 'Student Officer'){
        role = 'user'
    } else if(user.role === 'OSAS Staff'
        || user.role === 'OSAS Director'
        || user.role === 'Venue-In-Charge'
        || user.role === 'Department Dean'){
            role = 'admin'
    }
  
    return (<>

        { role === 'user' ? (
            <div class='info-container' onClick={gotoDetails}>
                <p>{reserves.subject}</p>
                <p>{reserves.org}</p>
                <p>{reserves.bldg}</p>
                <p>{reserves.room}</p>
                <p>{reserves.time_in} - {reserves.time_out}</p>
                <p>{reserves.status}</p>
            </div>
        ) : (
            <div class='info-container' onClick={gotoDetails}>
                <p>{reserves.requestor}</p>
                <p>{reserves.subject}</p>
                <p>{reserves.org}</p>
                <p>{reserves.bldg}</p>
                <p>{reserves.room}</p>
                <p>{reserves.time_in} - {reserves.time_out}</p>
            </div>
        )}
    </>);
}


export default ReservesContent