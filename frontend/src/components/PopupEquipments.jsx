import { FaBuilding} from 'react-icons/fa';
// import { updateReserve } from '../features/reserves/reserveSlice';
// import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'

// Deny
function closeEquip(){
    document.getElementById('popup_equip').style.cssText = 'display:none';
    document.getElementById('close').style.cssText = 'display:none';
    document.getElementById('open_popup').style.cssText = 'opacity: 100%';
}


export default function PopupEquipment() {

    return ( 
    <div className='testing-popup'>
       <div id='popup_equip' onClick={closeEquip}>
            <div className='confirmation_popup'>
                <div className='confirmation_header'>
                    <FaBuilding className='icon' id='iconEquip'/>
                </div>
                <div className='popup_text'>
                    <h2>Equipments in *Building Name*</h2>
                </div>
                <div className='popup_button'>
                <div className='equipment-container'>
                    <label>Equipments</label>
                    <select type='text'
                    className='form-control'
                    id='equipment'
                    name='equipment'
                    placeholder='Select equipment'>
                        <option hidden>- - - - -</option>
                        <option>Projector</option>
                        <option>HDMI Cable</option>
                    </select>
                </div>
                    <div className='p_buttons'>
                        <button id='btn' className='btnCancel' onClick={closeEquip}>Back</button>
                        <button id='btn' className='btnAdd'>Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}