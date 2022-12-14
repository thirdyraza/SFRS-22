import '../assets/scss/users-list.scss'

function UserContent({users}) {

    return (
        <div class='user-container'>
            <p id='id'>{users.idnum}</p>
            <p id='name'>{users.name}</p>
            <p id='role'>{users.role}</p>
            <p id='org'>{users.org}</p>
            <p id='dept'>{users.dept}</p>
        </div>
    );
}


export default UserContent