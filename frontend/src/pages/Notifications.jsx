import NotificationContent from '../components/NotificationContent';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getForCheck, getReserves, reset } from '../features/reserves/reserveSlice';
import '../assets/scss/notifications.scss'
import { getDeanNotifs, getHeadNotifs, getOsasNotifs } from '../features/notifs/notifSlice';
import NotificationCell from '../components/NotificationCell';
import Loader from '../components/Loader';

function Notifications() {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { headNotifs, deanNotifs, osasNotifs, isLoading } = useSelector((state) => state.notif)
    const { reserves, forChecks } = useSelector((state) => state.reserves)

    useEffect(() => {
        
        if(user.role === 'Student Officer' || user.role === 'Faculty'){
            dispatch(getReserves())
        } else if(user.role === 'Organization Adviser' || user.role === 'Head of Office'){
            dispatch(getHeadNotifs())
        } else if(user.role === 'Department Dean'){
            dispatch(getDeanNotifs())
        } else if(user.role === 'OSAS Dean'){
            dispatch(getOsasNotifs())
        } else if(user.role === 'Outdoor Stage In-Charge'){
            dispatch(getForCheck())
        }

        return () => {
            dispatch(reset())
        };
        
    }, [dispatch, user]);

    var role

    if(user.role === 'Faculty' || user.role === 'Student Officer'){
        role = 'user'
    } else if(user.role === 'Gym In-Charge' || user.role === 'Friendship Park In-Charge' || user.role === 'Outdoor Stage In-Charge'){
        role = 'venue in-charge'
    } else if(user.role === 'Organization Adviser' || user.role === 'Head of Office'){
        role = 'head'
    } else if(user.role === 'Department Dean'){
        role = 'dean'
    } else if(user.role === 'OSAS Dean'){
        role = 'osas'
    }

    if(isLoading){
        <Loader />
    }

    return ( 
        <div className="app">
        <div id="home">
        <div className='notifications'>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>

            <div className='n-header'>
                <div className="notif-head">
                    <div className='notif-name'>
                        <p className="notif-header">Notifications</p>
                        <i class='bx bx-notification'></i>
                    </div>

                </div>

            </div>

            <div className="n-top">
                <p/>
                <p>Reservation Details</p>
                <p>Remarks</p>
                <p>Requested Venue</p>
                <p>Requested Date</p>
                <p></p>
            </div>

            {role === 'user' ? (<>
                {reserves.length > 0 ? (
                <div>
                    {reserves.map((reserve) => (
                    <NotificationContent key={reserve._id} reserves={reserve}/>
                    ))}
                </div>
                ) : (<h3 className='notif-none'>No Notification Found</h3>)}
            </>) : (<>{role === 'head' ? (<>
                {headNotifs.length > 0 ? (
                <div>
                    {headNotifs.map((notif) => (
                    <NotificationCell key={notif._id} notifs={notif}/>
                    ))}
                </div>
                ) : (<h3 className='notif-none'>No Notifications Found</h3>)}
            </>) : (<>{role === 'dean' ? (<>
                {deanNotifs.length > 0 ? (
                <div>
                    {deanNotifs.map((notif) => (
                    <NotificationCell key={notif._id} notifs={notif}/>
                    ))}
                </div>
                ) : (<h3 className='notif-none'>No Notifications Found</h3>)}
            </>) : (<>{role === 'osas' ? (<>
                {osasNotifs.length > 0 ? (
                <div>
                    {osasNotifs.map((notif) => (
                    <NotificationCell key={notif._id} notifs={notif}/>
                    ))}
                </div>
                ) : (<h3 className='notif-none'>No Notifications Found</h3>)}
            </>) : (<>
                {forChecks.length > 0 ? (
                <div>
                    {forChecks.map((reserve) => (
                    <NotificationContent key={reserve._id} reserves={reserve}/>
                    ))}
                </div>
                ) : (<h3 className='notif-none'>No Notifications Found</h3>)}
            </>)}
            </>)}
            </>)}
            </>)}

            

        </div>
        </div>
      </div>

     );
}

export default Notifications; 