import { FaCheck } from 'react-icons/fa';
import { updateReserve } from '../features/reserves/reserveSlice';
import { setNotif } from '../features/notifs/notifSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'
import { useNavigate } from 'react-router-dom';

function closeApprove(){
    document.getElementById('popup_approve').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:none';
    document.getElementById('open_popup').style.cssText = 'opacity: 100%';
}

export default function PopupApprove() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const {reservation} = useSelector((state) => state.reserves)

    const approveReq = (e) => {
        e.preventDefault()

        let sgn
        let updStat

        if(user.role === 'Organization Adviser' || user.role === 'Head of Office'){
            sgn = 'Noted by '
            updStat = 'Department Dean'
        }else if(user.role === 'Department Dean'){
            sgn = 'Recommended by '
            updStat = 'OSAS Dean'
        }else if(user.role === 'OSAS Dean'){
            sgn = 'Approved by '
            updStat = 'Approved'
        }

        const updateData = {
            review: 'Approve',
            resID: reservation._id
        }
        dispatch(updateReserve(updateData))

        // remarks can be fetched via input in frontend
        
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
            remarks: 'Reviewed',
            sign: sgn + user.name,
        }
        dispatch(setNotif(notifData))

        navigate('../dashboard')
    }

     return (
    <div className='testing-popup'>
        <div id='popup_approve' onClick={closeApprove}>
            <div className='confirmation_popup'>
                <div className='confirmation_header'>
                    <FaCheck className='icon' id='iconConfirm'/>
                </div>
                <div className='popup_text'>
                    <h2>Do you want to approve the request?</h2>
                </div>
                <div className='popup_button'>
                    <button id='btn' className='btnCancel'>Back</button>
                    <button id='btn' className='btnConfirm' onClick={approveReq}>Approve</button>
                </div>
            </div>
        </div>
    </div>
  )
}