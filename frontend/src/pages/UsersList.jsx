import {useEffect} from 'react'
import UserHead from '../components/UserHeading';
import UserContent from '../components/UserContent';
import {useDispatch, useSelector} from 'react-redux'
import '../assets/scss/users-list.scss';
import {getUsers} from '../features/auth/authSlice'

function UsersList() {
    const dispatch = useDispatch()
    const {users} = useSelector((state) => state.auth)

    useEffect(() =>{ 
        dispatch(getUsers())

      }, [dispatch])

  return (
    <div className="app">
        <div id="home">
        <div class='container'>
            <div class='title'>
                REQUESTOR <div class='yellow'>ACCOUNTS</div>
            </div>

            <div class='search'>
                <input placeholder='Search By ID'></input>
                <div class='search-icon'></div>
            </div>

            <div class='switches'>
                <a href='/admin-home/requestor'>Requestors</a>
                <a href='/admin-home/admins'>Admins</a>
                <a href='/admin-home/archived'>Archived</a>
            </div>

            <div class='table-heading'>
                <UserHead/>
            </div>
            <section class='table-cell'>
            {users.length > 0 ? (
                <div>
                {users.map((user) => (
                    <UserContent key={user._id} users={user} />
                ))}
                </div>
            ) : (<h3>No Users Found</h3>)}
            </section>
            <div class='buttons'>
                <div>ARCHIVE</div>
                <div>UPDATE USER</div>
                <div>ADD USER</div>
            </div>
        </div>
        </div>
      </div>
  )
}

export default UsersList