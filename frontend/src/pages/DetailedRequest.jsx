import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import PopupCancel from '../components/PopupCancel';
import PopupApprove from '../components/PopupApprove';
import PopupDeny from '../components/PopupDeny';
import Loader from '../components/Loader';
import PopupLogs from '../components/PopupLogs';
import '../assets/scss/detailed-reserves.scss'

function openApprove(){
    document.getElementById('popup_approve').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'display:hidden';
}
function openDeny(){
    document.getElementById('popup_deny').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'display:hidden';
}
function openCancel(){
    document.getElementById('popup_cancel').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'display:hidden';
}
function openLogs(){
    document.getElementById('popup_logs').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'display:hidden';
}

function DetailedRequest() {
    
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
    const {reservation, isLoading} = useSelector((state) => state.reserves)

    var role

    if(user.role === 'Faculty' || user.role === 'Student Officer'){
            role = 'user'
    } else if(user.role === 'OSAS Dean' || user.role === 'Department Dean'
        || user.role === 'Organization Adviser' || user.role === 'Head of Office'){
            role = 'admin'
    }

    const goBack = () => {
        navigate(-1)
    }

    if(isLoading){
        <Loader />
    }

return (
    <div className='app'>
            <div id='home' className="RD-Container">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Reem+Kufi+Ink&display=swap');
                </style>

                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
                
                <div to="/notifications" id="btnBack" className="RD-Btns" onClick={goBack}>
                    <i className='bx bx-arrow-back' ></i>
                    <p>Back</p>
                </div>

                {/* RD Heading */}
                <div className="RD-Header">
                    <h3>REQUEST DETAILS</h3>
                    
                        {reservation.status === 'Cancelled' ? (
                            <div className="CStatus">
                                <p className='pending'>CANCELLED</p>
                            </div>
                        ):(<>{reservation.status === 'Denied' ? (<>
                            <div className="DStatus">
                                <p className="pending">DENIED</p>
                            </div>
                            </>) : (<>{reservation.counter === 3 ? (<>
                                <div className="AStatus">
                                    <p className="pending">APPROVED</p>
                                </div>
                            </>) : (<>
                                <div id='RStatus1' className="PStatus">
                                <p className="pending">PENDING</p> {reservation.counter}/3
                                </div>
                            </>)}</>)}
                        </>)}
                    
                </div>

                {/* Divider */}
                <hr className="solid"/>

                {/* RD Content */}
                <div className="Status">
                    <div className="RDC-Header">
                        <div className="RDC-Details">
                            <i id="Request_Icon"className='bx bxs-universal-access'/>
                            
                            <div className="r_name">
                                <div>
                                    <p>{reservation.requestor}</p>
                                    <p id="r_deptrole">{reservation.reqdept} | {reservation.reqrole}</p>
                                </div>
                                <div className="r_email">
                                    <i className='bx bx-envelope'/>
                                    <p>{reservation.reqid}@usl.edu.ph</p>
                                </div>

                            </div>
                        </div>

                        <div className="r_right">
                            <p>{reservation.createdAt}</p>
                            <i className='bx bxs-info-square' onClick={openLogs}></i>
                            <PopupLogs />
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
                {role === 'user' && reservation.status !== 'Cancelled' && reservation.status !== 'Denied' && reservation.counter !== 3 ? (<>
                    <div id="btnCancel" className="RD-Btns" onClick={openCancel}>
                        <p>Cancel Request</p>
                        <i className='bx bxs-x-circle'/>
                    </div>
                    <PopupCancel />
                    </>) : (<>
                    {role === 'admin' && reservation.status !== 'Denied' && reservation.status !== 'Cancelled' && reservation.counter !== 3 ? (<>
                    
                        <div id="btnApprove" className="RD-Btns" onClick={openApprove}>
                            <p>Approve Request</p>
                            <i className='bx bxs-check-circle'/>
                        </div>
                        <PopupApprove />
                        
                        
                        <div id="btnDeny" className="RD-Btns" onClick={openDeny}>
                            <p>Deny Request</p>
                            <i className='bx bxs-x-circle'/>
                        </div>
                        <PopupDeny />
                    </>): (<></>)}
                    
                </>)}

            </div>
        </div>
)
}

export default DetailedRequest