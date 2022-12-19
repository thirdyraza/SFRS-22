import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReservation } from '../features/reserves/reserveSlice'
import { getMe, reset } from "../features/auth/authSlice";

function NotificationContent({reserves}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const gotoDetails = (e) =>{
        e.preventDefault()
    
        const resID = reserves._id
        dispatch(getReservation(resID))
    
        navigate('../details:' + resID)
    }

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {

        dispatch(getMe())
        return () => {
            dispatch(reset())
        };
    }, [dispatch]);

    var by
    var role
    var respo
    var reviewed

    if(user.role === 'Faculty' || user.role === 'Student Officer'){
        role = 'user'
    } else if(user.role === 'OSAS Director' || user.role === 'Department Dean'
        || user.role === 'Organization Adviser' || user.role === 'Head of Office'){
            role = 'admin'
    } else if(user.role === 'Gym In-Charge' || user.role === 'Friendship Park In-Charge' || user.role === 'Outdoor Stage In-Charge'){
        role = 'venue in-charge'
    }

    if(reserves.counter === 1 && user.role === 'Student Officer'){
        reviewed = 'Organization Adviser'
        by = 'Noted by Sander Sedano'
        respo = 'Victor Villaluz'
    } else if (reserves.counter === 2 && user.role === 'Student Officer'){
        reviewed = 'Deparment Dean'
        by = 'Approved by Victor Villaluz'
        respo = 'Dean of Student Affairs and Services'
    }

    return ( 
    <>
        {role === 'admin' ? (<div>
            <div className="notif-content">
                <div className='notif-container'>
                    <i class='bx bxs-user-pin' ></i>
                    <div>
                        <p className="notif-name">{reserves.requestor} sent a reservation request</p>
                        <p className="notif-subject">Activity: {reserves.activity}</p>
                    </div>
                </div>

                <div className="notif-role">  
                    <p>{reserves.reqrole}</p>
                </div>
                <div className='notif-dt'>
                    <p>{reserves.date}</p>
                    <p>{reserves.time_in} to {reserves.time_out}</p>
                </div>
                <div className="notif-stat">  
                    <p>{reserves.counter}/4</p>
                </div>
                <button id="btnDetails" onClick={gotoDetails}>Details</button>
            </div>
        </div>) : (<>
            {role === 'user' ? (<>
                {reserves.counter > 0 ? (<div>
                    <div className="notif-content">
                        <div className='notif-container'>
                            <i class='bx bxs-user-pin' ></i>
                            <div>
                                <p className="notif-name">{reserves.status === 'Denied' ? (<>Denied by {respo}</>) : (<>{by}</>)}</p>
                                <p className="notif-subject">Activity: {reserves.activity}</p>
                            </div>
                        </div>

                        <div className="notif-role">  
                            <p>{reviewed}</p>
                        </div>
                        <div className='notif-dt'>
                            <p>{reserves.date}</p>
                            <p>{reserves.time_in} to {reserves.time_out}</p>
                        </div>
                        <div className="notif-stat">  
                            <p>{reserves.counter}/4</p>
                        </div>
                        <button id="btnDetails" onClick={gotoDetails}>Details</button>
                    </div>
                </div>
                ): (<>

                </>)}
            
            </>
            ) : (<div>
                <div className="notif-content">
                    <div className='notif-container'>
                        <i class='bx bxs-user-pin' ></i>
                        <div>
                            <p className="notif-name">{reserves.requestor} sent a reservation request</p>
                            <p className="notif-subject">Activity: {reserves.activity}</p>
                        </div>
                    </div>
    
                    <div className="notif-role">  
                        <p>{reserves.reqrole}</p>
                    </div>
                    <div className='notif-dt'>
                        <p>{reserves.date}</p>
                        <p>{reserves.time_in} to {reserves.time_out}</p>
                    </div>
                    <div className="notif-stat">  
                        <p>{reserves.counter}/4</p>
                    </div>
                    <button id="btnDetails" onClick={gotoDetails}>Details</button>
                </div>
            </div>
            )}
        </>)}
            
    </>

     );
}

export default NotificationContent;