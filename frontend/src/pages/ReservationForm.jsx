import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createReserve, getReservation } from '../features/reserves/reserveSlice'
import { setNotif } from '../features/notifs/notifSlice';
import '../assets/scss/mainform.scss';
import { useNavigate } from 'react-router-dom';

    function setMinDate(){
        
        var today = new Date()
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        dd += 3

        if(dd < 10){
            dd = '0' + dd
        }
        if(mm < 10){
            mm = '0' + mm
        }
            
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);

        document.getElementById('date').setAttribute("min", today);
    }

    export default function ReservationForm(){

    const {user} = useSelector((state) => state.auth)
    const {reserves, reservation} = useSelector((state) => state.reserves)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        activity: '',
        purpose: '',
        org: '',
        venue: '',
        room: '',
        date: new Date(),
        time_in: '',
        time_out: '',
    })
    const { activity, purpose, org, venue, room, date, time_in, time_out } = formData

    const SEAITE = ["PICE", "IIEE", "LITES", "UAPSA", "JIEEP", "LTL", "SSC", "CCA", "LUSC" ]
    const SABH = ["HOST", "JFINEX", "JPIA", "JMAH", "LTL", "SSC", "CCA", "LUSC" ]
    const SEAS = ["LIFE", "JAPS", "PSS", "CRIM", "LTL", "SSC", "CCA", "LUSC" ]
    const SHAS = ["LPSO", "LNSO", "LMTO", "LTL", "SSC", "CCA", "LUSC" ]

    const C = ["C 21", "C 22", "C 23", "C 24", "C 25", "C 26"]
    const B = ["B 11", "B 12", "B 13", "B 14"]
    const K = ["K 11", "K 12", "K 13", "K 14"]
    const N = ["N 21", "N 22", "N 23", "N 24", "N 25", "N 26"]
    const J = ["J 41", "J 42", "J 43", "J 44", "J 45", "J 46", "J 47"]

    const facis = ["Open Stage", "James Ter Mier Gymnasium", "Bulwagang Teodulfo", "Bulwagang Andres Nowe", "Friendship Park",
        "C Building", "B Building", "N Building", "J Building", "K Building", "EE Laboratory", "ECE Laboratory", "GE Laboratory"]
    const empt = ["Not Applicable"]
    const ee = ["K 12"]
    const ece = ["K 11"]
    const ge = ["B 13"]

    let underDept = null
    let orgs = null
    let bldgs
    let underBldg = null
    let noRooms = null
    let rooms = null

    if (user.dept === 'SEAITE') {underDept = SEAITE}
    else if (user.dept === 'SABH') { underDept = SABH }
    else if (user.dept === 'SEAS') { underDept = SEAS }
    else if (user.dept === 'SHAS') { underDept = SHAS }

    if(underDept){ orgs = underDept.map((e) => <option key={e}>{e}</option>) }
    bldgs = facis.map((e) => <option key={e}>{e}</option>)

    if(venue === 'C Building'){ underBldg = C }
    else if (venue === 'B Building'){ underBldg = B}
    else if (venue === 'K Building'){ underBldg = K}
    else if (venue === 'N Building'){ underBldg = N}
    else if (venue === 'J Building'){ underBldg = J}

    if(venue === 'Open Stage' || venue === 'James Ter Mier Gymnasium' || venue === 'Friendship Park' || venue === 'Bulwagang Teodulfo' || venue === 'Bulwagang Andres Nowe'){
        noRooms = empt
    }else if(venue === 'EE Laboratory') { noRooms = ee }
    else if(venue === 'ECE Laboratory') { noRooms = ece }
    else if(venue === 'GE Laboratory') { noRooms = ge }

    if(venue === 'EE Laboratory'){}

    if(underBldg){ rooms = underBldg.map((e) => <option key={e}>{e}</option>)}
    else if(noRooms) { rooms = noRooms.map((e) => <option key={e}>{e}</option>)}
    
    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(createReserve(formData))

        let sgn = ' sent a reservation request'
        let updStat

        if(user.role === 'Student Officer'){
            updStat = 'Organization Adviser'
        }else if(user.role === 'Faculty'){
            updStat = 'Head of Office'
        }

        dispatch(getReservation(reserves._id))

        const notifData = {
            resid: reservation._id,
            activity: reservation.activity,
            org: reservation.org,
            venue: reservation.venue,
            date: reservation.date,
            time_in: reservation.time_in,
            time_out: reservation.time_out,
            status: updStat,
            requestor: reservation.requestor,
            remarks: ' ',
            sign: 'You' + sgn,
        }
        dispatch(setNotif(notifData))

        setFormData({
            activity: '',
            purpose: '',
            org: '',
            venue: '',
            room: '',
            date: '',
            time_in: '',
            time_out: '',
        })

        navigate('../dashboard')
        
    }
    
    return(
    <div className="app">
        <div id="home">
            <div>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                <div className="reserve-form-container">
                    <form onSubmit={onSubmit}>
                        <h2>ACTIVITY VENUE RESERVATION FORM</h2>
                        <div className="note">
                            <h3 className="note_header">NOTE:</h3>
                            <div className="note_content">
                                <p>1. Venue/s for acitivities has/have to be reserved a week before the actual conduct of the activity.</p>
                                <p>2. This form shall only be used for duly approved activities which will be conducted inside the University Campus.</p>
                                <p>3. Extra copies shall be given to ever approving bodies.</p>
                            </div>
                        </div>
                        <div className="activity">
                            <label>Activity</label>
                            <input
                            type='text'
                            className='form-control'
                            id='activity'
                            name='activity'
                            value={activity}
                            onChange={onChange}
                            placeholder="State your Activity" />
                        </div>
                        <div className="purpose">
                            <label>Purpose</label>
                            <textarea
                            type='text'
                            className='form-control'
                            id='purpose'
                            name='purpose'
                            value={purpose}
                            onChange={onChange}
                            placeholder="State your Purpose" />
                        </div>

                        <div className="input-container">
                                <div className="in">
                                    <label>Organization</label>
                                    <select
                                    type="text"
                                    name='org'
                                    id='org'
                                    value = {org}
                                    onChange={onChange}>
                                        <option hidden>- - - - -</option>
                                        {orgs}
                                    </select>
                                </div>
                                <div className="in">
                                    <label>Venue</label>
                                    <select
                                    type="text"
                                    name='venue'
                                    id='venue'
                                    value = {venue}
                                    onChange={onChange}                                
                                    >
                                        <option hidden>- - - - -</option>
                                        {bldgs}
                                    </select>
                                </div>
                                <div className="in">
                                    <label>Room</label>
                                    <select
                                    type="text"
                                    name='room'
                                    id='room'
                                    value = {room}
                                    onChange={onChange}>
                                        <option hidden>- - - - -</option>
                                        {rooms}
                                    </select>
                                </div>
                        </div>

                        <div className="selectbottom">
                            <div className="in">
                                <label>Date</label>
                                <input type="date"
                                name= "date"
                                id= "date"
                                className='date-container'
                                value={date}
                                onChange={onChange}
                                onClick={setMinDate}
                                />
                            </div>

                            <div className="in">
                                <label>Time</label>
                                <div className="time-container">                        
                                    <input type="time"
                                    name="time_in"
                                    id="time_in"
                                    value={time_in}
                                    onChange={onChange}
                                    className='time-input'
                                    format='hh:mm'
                                    min="07:30" max="19:30"/>

                                    <p id="time-span">to</p>

                                    <input type="time"
                                    name="time_out"
                                    id="time_out"
                                    value={time_out}
                                    onChange={onChange}
                                    className='time-input'
                                    format='HH:MM'
                                    min="07:30" max="21:00"/>
                                </div>
                            </div>

                        </div>

                        <div className="equipment-container">  
                            <div className="in">
                                <label>Equipment</label>
                                <select type="text">
                                    <option hidden>- - - - -</option>
                                    <option>Projector</option>
                                    <option>Microphone</option>
                                </select>
                            </div>
                        </div>
                        <button type='submit' id="btnSubmit" className='btnForm btn btn-block'>
                            Submit
                        </button>

                    </form>
                    
                </div>
            </div>
        </div>
    </div>
            
    )
    
}