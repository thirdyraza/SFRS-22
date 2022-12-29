import NotificationContent from '../components/NotificationContent';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getReserves, reset } from '../features/reserves/reserveSlice';
import '../assets/scss/notifications.scss'

function Notifications() {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { reserves } = useSelector((state) => state.reserves)

    useEffect(() => {

        dispatch(getReserves())

        return () => {
            dispatch(reset())
        };
    }, [dispatch]);

    var role

    if(user.role === 'Faculty' || user.role === 'Student Officer'){
        role = 'user'
    } else if(user.role === 'OSAS Dean' || user.role === 'Department Dean'
        || user.role === 'Organization Adviser' || user.role === 'Head of Office'){
            role = 'admin'
    } else if(user.role === 'Gym In-Charge' || user.role === 'Friendship Park In-Charge' || user.role === 'Outdoor Stage In-Charge'){
        role = 'venue in-charge'
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

                <div className='select-sort'>
                    <p>Sort by </p>
                    <select>
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>Unread</option>
                    </select>
                </div>

            </div>

            <div className="n-top">
                <span/>      
                <p>Reservation Details</p>
                <p>Role</p>
                <p>Requested Date</p>
                <p>Approval</p>
            </div>

            {reserves.length > 0 ? (
                <div>
                    {reserves.map((reserve) => (
                    <NotificationContent key={reserve._id} reserves={reserve}/>
                    ))}
                </div>
            ) : (<h3 className='notif-none'>No Notifications Found</h3>)}

            

        </div>
        </div>
      </div>

     );
}

export default Notifications; 