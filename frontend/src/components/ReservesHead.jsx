import { useSelector } from 'react-redux';
import '../assets/scss/table.scss';

function ReservesHead() {
    
    const { user } = useSelector((state) => state.auth)
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
            <div class='heading'>
                <p>Activity</p>
                <p>Organization</p>
                <p>Building/Facility</p>
                <p>Room</p>
                <p>Time</p>
                <p>Status</p>
            </div>
        ) : (
            <div class='heading'>
                <p>Requestor</p>
                <p>Activity</p>
                <p>Organization</p>
                <p>Building/Facility</p>
                <p>Room</p>
                <p>Time</p>
            </div>
        )}
    </>);
}


export default ReservesHead