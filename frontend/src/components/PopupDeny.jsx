import { FaTimes } from 'react-icons/fa';
import { updateReserve } from '../features/reserves/reserveSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'

function closeDeny(){
    document.getElementById('popup_deny').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:none';
    document.getElementById('open_popup').style.cssText = 'opacity: 100%';
}
function openDeny(){
    document.getElementById('popup_deny').style.cssText = 'display:flex';
    document.getElementById('close').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'display:hidden';
}

export default function PopupDeny() {

    const dispatch = useDispatch()
    const {reservation} = useSelector((state) => state.reserves)

    const denyReq = (e) => {
        e.preventDefault()

        const updateData = {
            review: 'Deny',
            resID: reservation._id
        }

        dispatch(updateReserve(updateData))
        
    }

    return (
    <div className='testing-popup'>
        <div id='popup_deny' onClick={closeDeny}>
            <div className='confirmation_popup'>
                <div className='confirmation_header'>
                    <FaTimes className='icon' id='iconDeny'/>
                </div>
                <div className='popup_text'>
                    <h2>Do you want to deny the request?</h2>
                </div>
                <div id='btnDeny' className='popup_button'>
                    <button id='btn' className='btnCancel'>Back</button>
                    <button id='btn' className='btnDeny'>Deny</button>
                </div>
            </div>
        </div>
    </div>
  )
}