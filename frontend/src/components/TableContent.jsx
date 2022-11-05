import '../assets/scss/table.scss'
import { Link } from "react-router-dom";

function UserTable() {
    return (
        <Link to='/'> 
            <div class='info-container'>
                    <p id='id'>
                        1302281
                    </p>
                    <p id='name'>
                        Andrei Louis C. Pagalilauan
                    </p>
                    <p id='dept'>
                        SEAITE
                    </p>
                    <p id='org'>
                        Lites
                    </p>
            </div>
        </Link>
    );
}


export default UserTable