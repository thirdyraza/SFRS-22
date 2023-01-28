import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readNotif } from "../features/notifs/notifSlice";
import { getReservation } from "../features/reserves/reserveSlice";

export default function NotificationCell({notifs}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const gotoDetails = (e) =>{
        e.preventDefault()
        
        const resID = notifs.reservation
        dispatch(getReservation(resID))
        dispatch(readNotif(resID))
    
        navigate('../details:' + resID)
    }

    let role
    if(user.role === 'Organization Adviser' || user.role === 'Head of Office'){ role = 'head' }
    

  return (
    <div className="notif-content" onClick={gotoDetails}>

        <div className='notif-container'>
            <i class='bx bxs-user-pin' ></i>
            <div>
                <p className="notif-name">{role === 'head' ? (<>{notifs.updby} {notifs.sign}</>)
                : (<>{user.name === notifs.updby ? (<>{notifs.sign}</>)
                    : (<>{notifs.updby} {notifs.sign}</>)}</>)}</p>
                <p className="notif-subject">Activity: {notifs.resact}</p>
            </div>
        </div>

        <div className="notif-remarks">  
            <p>{notifs.remarks}</p>
        </div>

        <div className='notif-ven'>
            <p>{notifs.resven}</p>
        </div>

        <div className='notif-dt'>
            <p>{notifs.resdate}</p>
            <p>{notifs.restime_in} to {notifs.restime_out}</p>
        </div>

        <div className="notif-stat">  
            <p>{notifs.createdAt}</p>
        </div>

    </div>
  )
}
