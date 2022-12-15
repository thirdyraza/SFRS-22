import { FaCheck } from 'react-icons/fa';
import { updateReserve } from '../features/reserves/reserveSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'

function closeApprove(){
    document.getElementById('popup_approve').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:none';
    document.getElementById('open_popup').style.cssText = 'opacity: 100%';
}
function openApprove(){
    document.getElementById('popup_approve').style.cssText = 'display:flex';
    document.getElementById('close').style.cssText = 'display:flex';
    document.getElementById('open_popup').style.cssText = 'display:hidden';
}

export default function PopupApprove() {

    const dispatch = useDispatch()
    const {reservation} = useSelector((state) => state.reserves)

    const approveReq = (e) => {
        e.preventDefault()

        const updateData = {
            review: 'Approve',
            resID: reservation._id
        }

        dispatch(updateReserve(updateData))
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
                    <button id='btn' className='btnConfirm'>Confirm</button>
                </div>
            </div>
        </div>
    </div>
  )
}