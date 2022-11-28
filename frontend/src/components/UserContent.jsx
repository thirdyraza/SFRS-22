import '../assets/scss/table.scss'
import {useDispatch} from 'react-redux';
// import {deleteUser} from '../features/auth/authSlice'

function UserContent({users}) {
    const dispatch = useDispatch()

    return (
        <div class='info-container'>
            <p id='id'>{users.idnum}</p>
            <p id='name'>{users.name}</p>
            <p id='role'>{users.role}</p>
            <p id='org'>{users.org}</p>
            <p id='dept'>{users.dept}</p>
            {/* <button onClick={() => dispatch(deleteUser(users._id))} className="close">X</button> */}
        </div>
    );
}


export default UserContent