import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReservation } from "../features/reserves/reserveSlice";

export default function NotificationCell({notifs}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const gotoDetails = (e) =>{
        e.preventDefault()
    
        const resID = notifs._id
        dispatch(getReservation(resID))
    
        navigate('../details:' + resID)
    }

  return (
    <div className="notif-content">
        <div className='notif-container'>
            <i class='bx bxs-user-pin' ></i>
            <div>
                <p className="notif-name">{notifs.status === 'Denied' ? (<>{notifs.sign}</>) : (<>{notifs.sign}</>)}</p>
                <p className="notif-subject">Activity: {notifs.resact}</p>
            </div>
        </div>

        <div className="notif-role">  
            <p>{notifs.updrole}</p>
        </div>
        <div className='notif-dt'>
            <p>{notifs.resdate}</p>
            <p>{notifs.restime_in} to {notifs.restime_out}</p>
        </div>
        <div className="notif-stat">  
            <p>{notifs.createdAt}</p>
        </div>
        <button id="btnDetails" onClick={gotoDetails}>Details</button>
    </div>
  )
}
