import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReservation } from '../features/reserves/reserveSlice'


function NotificationContent({reserves}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const gotoDetails = (e) =>{
        e.preventDefault()
    
        const resID = reserves._id
        dispatch(getReservation(resID))
    
        navigate('../details:' + resID)
    }

    return ( 
    <div>
            <div className="notif-content">
                <div className="notif-indicator">
                <i class='bx bxs-circle' ></i>
                </div>

                <div className='notif-container'>
                    <i class='bx bxs-user-pin' ></i>
                    <div>
                        <p className="notif-name">{reserves.requestor}</p>
                        <p className="notif-subject">Subject: {reserves.subject}</p>
                    </div>
                </div>

                <div className="notif-role">  
                    <p>Requestor</p>
                </div>

                <div className='notif-dt'>
                    <p>{reserves.date}</p>
                    <p>{reserves.time_in} to {reserves.time_out}</p>
                </div>
                    <button id="btnDetails" onClick={gotoDetails}>Details</button>
            </div>
    </div>

     );
}

export default NotificationContent;