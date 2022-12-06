import NotificationContent from '../components/NotificationContent';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllReserves, reset } from '../features/reserves/reserveSlice';
import '../assets/scss/notifications.scss'

function Notifications() {

    const dispatch = useDispatch()

    const { allReserves } = useSelector((state) => state.reserves)

    useEffect(() => {
        dispatch(getAllReserves())
        return () => {
            dispatch(reset())
        };
    }, [dispatch]);

    return ( 
        <div className="app">
        <div id="home">
        <div className='notifications'>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>

            <div className='n-header'>
                <div className="notif-head">
                    <div className='notif-name'>
                        <p className="notif-header">Notifications</p>
                        <i class='bx bx-notification' ></i>
                    </div>
                    <div className='notif-ctr'>
                        <p>You curently have notifications</p>
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

                <div>
                    <button type='submit'>Mark as read</button>
                </div>


            </div>

            <div className="n-top">
                <span/>
                <p>Details</p>
                <span/>
                <p>Date</p>
            </div>

            {allReserves.length > 0 ? (
                <div>
                {allReserves.map((reserve) => (
                    <NotificationContent key={reserve._id} reserves={reserve}/>
                ))}
                </div>
              ) : (<h3>No Notifications Found</h3>)}

        </div>
        </div>
      </div>

     );
}

export default Notifications; 