import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getReservation, reset } from '../features/reserves/reserveSlice';
import '../assets/scss/detailed-reserves.scss'
import { getMe } from '../features/auth/authSlice';

function DetailedRequest() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {reservation} = useSelector((state) => state.reserves)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {

        dispatch(getMe())
        dispatch(getReservation(reservation))

        return () => {
            dispatch(reset())
        };

    }, [dispatch, reservation, user]);

    var role

    if(user.role === 'Faculty'
        || user.role === 'Student Officer'){
            role = 'user'
    } else if(user.role === 'OSAS Staff'
        || user.role === 'Director Student Affairs and Services'
        || user.role === 'Venue-In-Charge'
        || user.role === 'Department Dean'){
            role = 'admin'    
    }

    const goBack = () => {
        navigate(-1)
    }

    
    
return (
    <div class='app'>
            <div id='home' class="RD-Container">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Reem+Kufi+Ink&display=swap');
                </style>

                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                
                <div to="/notifications" id="btnBack" className="RD-Btns" onClick={goBack}>
                    <i class='bx bx-arrow-back' ></i>
                    <p>Back</p>
                </div>

                {/* RD Heading */}
                <div className="RD-Header">
                    <h3>REQUEST DETAILS</h3>
                    <div id='RStatus1' className="RStatus">
                        <p className="pending">PENDING</p> 0/2
                    </div>
                    <div id='RStatus2' className="RStatus">
                        <p className="pending">PENDING</p> 1/2
                    </div>
                    <div id='RStatus3' className="RStatus">
                        <p className="pending">REQUEST APPROVED</p>
                    </div>
                </div>

                {/* Divider */}
                <hr class="solid"/>

                {/* RD Content */}
                <div classname="Status">
                    <div className="RDC-Header">
                        <div className="RDC-Details">
                            <i id="Request_Icon"class='bx bxs-universal-access'/>
                            
                            <div className="r_name">
                                <div>
                                    <p>Andrei Louis C. Pagalilauan</p>  
                                    <p id="r_deptrole">SEAITE Department | Student Officer</p>
                                </div>
                                <div className="r_email">
                                    <i class='bx bx-envelope'/>
                                    <p>1302281@usl.edu.ph</p>
                                </div>

                            </div>
                        </div>

                        <div className="r_right">
                            <p>September 27, 2022</p>
                            <i class='bx bxs-info-square'></i>
                        </div>
                    </div>

                    <div className="RDC-Body">
                        <div>
                            <p>SUBJECT: {reservation.purpose}</p>
                        </div>
                        <div>
                            <p className="b_title">PURPOSE:</p>
                            <p>To whom it may concern, <br/>

                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. 
                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web 
                            sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>        
                        </div>
                    </div>
                </div>

                
                {/* RD Additional Content */}
                <div>
                    <div className="RDA-Header">
                        <div>REQUEST OVERVIEW</div>
                        <div id="btnAttached" class="RD-Btns">Attached Files<i class='bx bx-download'/></div>
                    </div>
                    <div className="RDA-Body">
                        <p>Building:   {reservation.bldg}</p>
                        <p>Room:   {reservation.room}</p>
                        <p>Requested Date:   {reservation.date}</p>
                        <p>Time:   {reservation.time_in} to {reservation.time_out}</p>
                    </div>
                </div>
                
                {/* RD Buttons */}
                {role === 'user' ? (
                    <div id="btnCancel" class="RD-Btns">
                        <p>Cancel Request</p>
                        <i class='bx bxs-x-circle'/>
                    </div>
              ) : (<>
                    <div id="btnCancel" class="RD-Btns">
                        <p>Approve Request</p>
                        <i class='bx bxs-x-circle'/>
                    </div>
                    
                    <div id="btnCancel" class="RD-Btns">
                        <p>Deny Request</p>
                        <i class='bx bxs-x-circle'/>
                    </div>
                </>)}

            </div>
        </div>
)
}

export default DetailedRequest