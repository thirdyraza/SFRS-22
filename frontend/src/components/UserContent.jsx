import '../assets/scss/table.scss'

function UserContent({users}) {
    return (
        <div class='info-container'>
            <p id='id'>{users.idnum}</p>
            <p id='name'>{users.name}</p>
            <p id='org'>'LITES'</p>
            <p id='dept'>'SEAITE'</p>
        </div>
    );
}


export default UserContent