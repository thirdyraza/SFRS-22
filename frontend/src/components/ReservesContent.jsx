import '../assets/scss/table.scss'

function ReservesContent({reserves}) {
    return (
        <div class='info-container'>
            <p id='purpose'>{reserves.purpose}</p>
            <p id='room'>{reserves.room}</p>
            <p id='date'>{reserves.date}</p>
        </div>
    );
}


export default ReservesContent