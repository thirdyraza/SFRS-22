import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {createReserve} from '../features/reserves/reserveSlice'
import '../assets/scss/MainForm.scss';

function MainForm(){
    const [formData, setFormData] = useState({
        purpose: '',
        org: '',
        dept: '',
        bldg: '',
        room: '',
        date: '',
        time_in: '',
        time_out: '',
        status: 'Not Approved'
    })

    const { purpose, org, dept, bldg, room, date, time_in, time_out, status } = formData

    const dispatch = useDispatch()

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        
            const reserveData = {
                purpose,
                org,
                dept,
                bldg,
                room,
                date,
                time_in,
                time_out,
                status
            }
            dispatch(createReserve(reserveData))
            setFormData({
                purpose: '',
                org: '',
                dept: '',
                bldg: '',
                room: '',
                date: '',
                time_in: '',
                time_out: '',
                status: 'Not Approved'
            })
    }

    return(
    <div className="app">
        <div id="home">
        <div>
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                <div className="form-container">
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
                            <div className="selectleft">
                                <div className="in">
                                    <label>Organization</label>
                                    <select
                                    type="text"
                                    value = {org}
                                    onChange={onChange}>
                                        <option>- - - - -</option>
                                        <option>LITES</option>
                                        <option>IIEE</option>
                                        <option>GESA</option>
                                        <option>UAPSA</option>
                                        <option>JCIEPEP</option>
                                    </select>
                                </div>
                                <div className="in">
                                    <label>Department</label>
                                    <select
                                    type="text"
                                    value = {dept}
                                    onChange={onChange}>
                                        <option>- - - - -</option>
                                        <option>SEAITE</option>
                                        <option>SEAS</option>
                                        <option>SABH</option>
                                        <option>SHAS</option>
                                        <option>SHS</option>
                                    </select>
                                </div>
                            </div>

                            <div className="selectright">
                                <div className="in">
                                    <label>Building</label>
                                    <select
                                    type="text"
                                    value = {bldg}
                                    onChange={onChange}>
                                        <option>- - - - -</option>
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
                                    value = {date}
                                    onChange={onChange}>
                                        <option>- - - - -</option>
                                        <option>R 21</option>
                                        <option>N 46</option>
                                        <option>J 43</option>
                                        <option>H 23</option>
                                        <option>K 13</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="selectbottom">
                            <div className="in">
                                <label>Date</label>
                                <select
                                type="text"
                                value = {date}
                                onChange={onChange}>
                                    <option>-- / -- / --</option>
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                </select>
                            </div>

                            <div className="in">
                                <label>Time</label>
                                <div className="time-container">
                                    <select
                                    type="text"
                                    value = {time_in}
                                    onChange={onChange}>
                                        <option>-- : --</option>
                                        <option>7:30</option>
                                        <option>9:00</option>
                                        <option>10:30</option>
                                        <option>12:00</option>
                                        <option>1:30</option>
                                    </select>
                                    <p id="time-span">to</p>
                                    <select
                                    type="text"
                                    value={time_out}
                                    onChange={onChange}>
                                        <option>-- : --</option>
                                        <option>7:30</option>
                                        <option>9:00</option>
                                        <option>10:30</option>
                                        <option>12:00</option>
                                        <option>1:30</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="equipment-container">  
                            <div className="in">
                                <label>Equipment</label>
                                <select type="text" placeholder="MM/DD/YY">
                                    <option>Default Value</option>
                                </select>
                            </div>
                            <div className="in">
                                <label>Quantity</label>
                                <select type="text" placeholder="MM/DD/YY">
                                    <option>Default Value</option>
                                </select>
                            </div>
                            <div id="btnAdd">
                                <i class='bx bxs-plus-circle'></i>
                            </div>
                        </div>


                        <br/>
                        <div id="btnSubmit"className="btnForm">
                            <button type='submit' className='btn btn-block'>Submit</button>
                            <i class='bx bx-check-circle' ></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
            
    )
}

export default MainForm;