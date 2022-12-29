import { FaFlag } from 'react-icons/fa';
import { updateReserve } from '../features/reserves/reserveSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'
import { useNavigate } from 'react-router-dom';

function closeCancel(){
    document.getElementById('popup_cancel').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:none';
    document.getElementById('open_cancel').style.cssText = 'opacity: 100%';
}

export default function PopupCancel() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {reservation} = useSelector((state) => state.reserves)

    const cancelReq = (e) => {
        e.preventDefault()
    
        const updateData = {
            review: 'Cancel',
            resID: reservation._id
        }

        dispatch(updateReserve(updateData))
        navigate('../dashboard')

    }

    return (
    <div className='testing-popup'>
        <div id="popup_cancel" onClick={closeCancel}>
                <div className='confirmation_popup'>
                    <div className='confirmation_header'>
                        <FaFlag className='icon' id='iconCancel'/>
                    </div>
                    <div className='popup_text'>
                        <h2>Do you want to cancel the request?</h2>
                    </div>
                    <div className='popup_button'>
                        <button id='btn' className='btnCancel' onClick={cancelReq}>Back</button>
                        <button id='btn' className='btnCancel2' onClick={closeCancel}>Cancel</button>
                    </div>
                </div>
        </div>
        
    </div>
  )
}