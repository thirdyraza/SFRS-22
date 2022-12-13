import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import '../assets/scss/detailed-reserves.scss'
import { getMe, reset } from '../features/auth/authSlice';
import { updateReserve } from '../features/reserves/reserveSlice';

const DetailedRequest = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)
    const {reservation} = useSelector((state) => state.reserves)

    useEffect(() => {

        dispatch(getMe())
        return () => {
            dispatch(reset())
        };

    }, [dispatch]);

    var role

    if(user.role === 'Faculty' || user.role === 'Student Officer'){
            role = 'user'
    } else if(user.role === 'OSAS Director' || user.role === 'Department Dean'
        || user.role === 'Organization Adviser' || user.role === 'Head of Office'){
            role = 'admin'
    }

    const approveReq = (e) => {
        e.preventDefault()

        const resID = reservation._id
        dispatch(updateReserve(resID))
    }

    const denyReq = (e) => {
        e.preventDefault()

        reservation.status = 'Denied'
    }

    const cancelReq = (e) => {
        e.preventDefault()

        reservation.status = 'Cancelled'
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
                        <p className="pending">PENDING</p> {reservation.counter}/3
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
                                    <p>{reservation.requestor}</p>
                                    <p id="r_deptrole">{reservation.reqdept} | {reservation.reqrole}</p>
                                </div>
                                <div className="r_email">
                                    <i class='bx bx-envelope'/>
                                    <p>{reservation.reqid}@usl.edu.ph</p>
                                </div>

                            </div>
                        </div>

                        <div className="r_right">
                            <p>{reservation.createdAt}</p>
                            <i class='bx bxs-info-square'></i>
                        </div>
                    </div>

                    <div className="RDC-Body">
                        <div>
                            <p>SUBJECT: {reservation.activity}</p>
                        </div>
                        <div>
                            <p className="b_title">PURPOSE:</p>
                            <p>{reservation.purpose}</p>        
                        </div>
                    </div>
                </div>

                
                {/* RD Additional Content */}
                <div>
                    <div className="RDA-Header">
                        <div>REQUEST OVERVIEW</div>
                    </div>
                    <div className="RDA-Body">
                        <p>Building:  {reservation.venue}</p>
                        <p>Room:  {reservation.room}</p>
                        <p>Requested Date: {reservation.date}</p>
                        <p>Time: {reservation.time_in} to {reservation.time_out}</p>
                    </div>
                </div>
                
                {/* RD Buttons */}
                {role === 'user' ? (
                    <div id="btnCancel" class="RD-Btns" onClick={cancelReq}>
                        <p>Cancel Request</p>
                        <i class='bx bxs-x-circle'/>
                    </div>
              ) : (<>
                    <div id="btnApprove" class="RD-Btns" onClick={approveReq}>
                        <p>Approve Request</p>
                        <i class='bx bxs-x-circle'/>
                    </div>
                    
                    <div id="btnDeny" class="RD-Btns" onClick={denyReq}>
                        <p>Deny Request</p>
                        <i class='bx bxs-x-circle'/>
                    </div>
                </>)}

            </div>
        </div>
)
}

export default DetailedRequest