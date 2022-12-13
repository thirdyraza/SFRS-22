import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { createReserve, getReservation } from '../features/reserves/reserveSlice'
import '../assets/scss/mainform.scss';

function ReservationForm(){
    const [formData, setFormData] = useState({
        activity: '',
        purpose: '',
        org: '',
        venue: '',
        room: '',
        date: '',
        time_in: '',
        time_out: '',
    })

    const { activity, purpose, org, venue, room, date, time_in, time_out } = formData
    const {reserves} = useSelector((state) => state.reserves)

    const dispatch = useDispatch()
    const navigate = useNavigate

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(createReserve(formData))
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

        const resID = reserves._id
        dispatch(getReservation(resID))
    
        navigate('../details:' + resID)
        
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
                            <h3 class="note_header">NOTE:</h3>
                            <div class="note_content">
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
                                        <option>LITES</option>
                                        <option>IIEE</option>
                                        <option>GESA</option>
                                        <option>UAPSA</option>
                                        <option>JCIEPEP</option>
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
                                        <option>R Building</option>
                                        <option>N Building</option>
                                        <option>J Building</option>
                                        <option>H Building</option>
                                        <option>K Building</option>
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
                                        <option>R 21</option>
                                        <option>N 46</option>
                                        <option>J 43</option>
                                        <option>H 23</option>
                                        <option>K 13</option>
                                    </select>
                                </div>
                        </div>

                        <div className="selectbottom">
                            <div className="in">
                                <label>Date</label>
                                <input type="date" name="date" id="date" className='date-container' value={date} onChange={onChange}/>
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
                                    min="07:30" max="19:30"/>

                                    <p id="time-span">to</p>

                                    <input type="time"
                                    name="time_out"
                                    id="time_out"
                                    value={time_out}
                                    onChange={onChange}
                                    className='time-input'
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

export default ReservationForm;