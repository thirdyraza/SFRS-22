import '../assets/scss/checker.scss'

function CheckerContent({reserves}) {
  
    return (
    <div class='check-container'>
        <p>{reserves.activity}</p>
        <p>{reserves.venue}</p>
        <p>{reserves.room}</p>
        <p>{reserves.time_in} - {reserves.time_out}</p>
        {reserves.status === 'Cancelled' || reserves.status === 'Denied' ? (<></>) : (<><p>{reserves.counter}  /  3</p></>)}
    </div>
    );
}


export default CheckerContent