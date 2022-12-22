import { FaCheck } from 'react-icons/fa';
import { updateReserve, getReservation } from '../features/reserves/reserveSlice';
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
    const {reservation} = useSelector((state) => state.reserves)

    const approveReq = (e) => {
        e.preventDefault()

        const updateData = {
            resID: reservation._id
        }

        dispatch(updateReserve(updateData))

        const resID = reservation._id
        dispatch(getReservation(resID))
        navigate('../details:' + resID)
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