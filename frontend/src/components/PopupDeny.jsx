import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { updateReserve } from '../features/reserves/reserveSlice';
import { setNotif } from '../features/notifs/notifSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'
import { useNavigate } from 'react-router-dom';

function closeDeny(){
    document.getElementById('popup_deny').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'opacity: 100%';
}

export default function PopupDeny() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {reservation} = useSelector((state) => state.reserves)
    const {user} = useSelector((state) => state.auth)

    const [remarks, setRemarks] = useState('');

    const denyReq = (e) => {
        e.preventDefault()

        let sgn = 'Denied by '
        let updStat = 'Denied'

        const updateData = {
            review: 'Deny',
            resID: reservation._id
        }

        dispatch(updateReserve(updateData))

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
            remarks: remarks,
            sign: sgn + user.name,
        }
        dispatch(setNotif(notifData))

        navigate('../dashboard')
        
    }

    return (
    <div className='testing-popup'>
        <div id='popup_deny'>
            <div className='confirmation_popup'>
                <div className='confirmation_header'>
                    <FaTimes className='icon' id='iconDeny'/>
                </div>
                <div className='popup_text'>
                    <h2>Do you want to deny this request?</h2>
                </div>
                <div className="remarks-container">
                    <textarea id='remarks' name='remarks' value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Add remarks" required/> 
                </div>
                <div className='p_buttons'>
                    <button id='btn' className='btnCancel' onClick={closeDeny}>Back</button>
                    <button id='btn' className='btnDeny' onClick={denyReq}>Cofirm</button>
                </div>
            </div>
        </div>
    </div>
  )
}