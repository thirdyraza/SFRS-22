import { useState } from 'react';
import { FaFlag } from 'react-icons/fa';
import { updateReserve } from '../features/reserves/reserveSlice';
import { setNotif } from '../features/notifs/notifSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'
import { useNavigate } from 'react-router-dom';

function closeCancel(){
    document.getElementById('popup_cancel').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:flex';
    document.getElementById('open_cancel').style.cssText = 'opacity: 100%';
}

export default function PopupCancel() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {reservation} = useSelector((state) => state.reserves)
    const {user} = useSelector((state) => state.auth)
    const [remarks, setRemarks] = useState('');

    const cancelReq = (e) => {
        e.preventDefault()

        let sgn = 'Cancelled by '
        let updStat = 'Cancelled'
    
        const updateData = {
            review: 'Cancel',
            level: 'Cancelled',
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
        <div id="popup_cancel">
                <div className='confirmation_popup'>
                    <div className='confirmation_header'>
                        <FaFlag className='icon' id='iconCancel'/>
                    </div>
                    <div className='popup_text'>
                        <h2>Do you want to cancel the request?</h2>
                    </div>
                    <div className='popup_button'>
                        <div className='remarks-container'>
                            <textarea id='remarks' name='remarks' value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Reason for cancellation" required/>                                                
                        </div>
                        <div className="p_buttons">
                            <button id='btn' className='btnCancel' onClick={closeCancel}>Back</button>
                            <button id='btn' className='btnCancel2' onClick={cancelReq}>Confirm</button>
                        </div>
                        
                    </div>
                </div>
        </div>
        
    </div>
  )
}