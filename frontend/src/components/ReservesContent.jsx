import '../assets/scss/table.scss'

function ReservesContent({reserves}) {
    return (
        <div class='info-container'>
            <p id='purpose'>{reserves.purpose}</p>
            <p id='building'>{reserves.bldg}</p>
            <p id='room'>{reserves.room}</p>
            <p id='time_in'>{reserves.time_in}</p>
            <p id='time_out'>{reserves.time_out}</p>
        </div>
    );
}


export default ReservesContent