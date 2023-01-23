import { FaBuilding} from 'react-icons/fa';
// import { updateReserve } from '../features/reserves/reserveSlice';
// import { useDispatch, useSelector } from 'react-redux';
import '../assets/scss/popup.scss'

function closeEquip(){
    document.getElementById('popup_equip').style.cssText = 'display:none';
    document.getElementById('open_popup').style.cssText = 'opacity: 100%';
}


export default function PopupEquipment() {

    return ( 
    <div className='testing-popup'>
       <div id='popup_equip'>
            <div className='confirmation_popup'>
                <div className='confirmation_header'>
                    <FaBuilding className='icon' id='iconEquip'/>
                </div>
                <div className='equip'>
                    <h2 id='equip-title'>Venue Equipment</h2>
                </div>
                <div className='equip-cont'>
                    <div className='equip-input'>
                        <label>Equipment</label>
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
                    <div className='equip-btn'>
                        <button id='btn' className='btnCancel' onClick={closeEquip}>Back</button>
                        <button id='btn' className='btnAdd'>Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}