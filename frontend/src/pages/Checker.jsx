import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getExisting, reset } from '../features/reserves/reserveSlice';
import CheckerHead from '../components/CheckerHead'
import CheckerContent from '../components/CheckerContent'


import '../assets/scss/reqform.scss';
import '../assets/scss/checker.scss';

function Checker() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [tempData, setTempData] = useState({
        tempven: '',
        tempro: '',
        tempda: '',
    });

    useEffect(() => {
        return () => {
            dispatch(reset())
        };
    }, [dispatch]);

    const {existings, tempres} = useSelector((state) => state.reserves)

    const { tempven, tempro, tempda } = tempData

    const C = ["C 21", "C 22", "C 23", "C 24", "C 25", "C 26"]
    const B = ["B 11", "B 12", "B 13", "B 14"]
    const K = ["K 11", "K 12", "K 13", "K 14"]
    const N = ["N 21", "N 22", "N 23", "N 24", "N 25", "N 26"]
    const J = ["J 41", "J 42", "J 43", "J 44", "J 45", "J 46", "J 47"]

    const facis = ["Open Stage", "James Ter Mier Gymnasium", "Bulwagang Teodulfo", "Bulwagang Andres Nowe", "Friendship Park",
        "C Building", "B Building", "N Building", "J Building", "K Building", "EE Laboratory", "ECE Laboratory", "GE Laboratory"]
    const empt = ["Not Applicable"]
    const ee = ["K 12"]
    const ece = ["K 11"]
    const ge = ["B 13"]

    let bldgs
    let underBldg = null
    let noRooms = null
    let rooms = null

    bldgs = facis.map((e) => <option key={e}>{e}</option>)

    if(tempven === 'C Building'){ underBldg = C }
    else if (tempven === 'B Building'){ underBldg = B}
    else if (tempven === 'K Building'){ underBldg = K}
    else if (tempven === 'N Building'){ underBldg = N}
    else if (tempven === 'J Building'){ underBldg = J}

    if(tempven === 'Open Stage' || tempven === 'James Ter Mier Gymnasium' || tempven === 'Friendship Park' || tempven === 'Bulwagang Teodulfo' || tempven === 'Bulwagang Andres Nowe'){
        noRooms = empt
    }else if(tempven === 'EE Laboratory') { noRooms = ee }
    else if(tempven === 'ECE Laboratory') { noRooms = ece }
    else if(tempven === 'GE Laboratory') { noRooms = ge }

    if(tempven === 'EE Laboratory'){}

    if(underBldg){ rooms = underBldg.map((e) => <option key={e}>{e}</option>)}
    else if(noRooms) { rooms = noRooms.map((e) => <option key={e}>{e}</option>)}

    const onChange = (e) =>{
        setTempData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    
    const ifExist = (e) => {
        e.preventDefault()

        dispatch(getExisting(tempres))
    }

    const clear = () =>{
        setTempData({
            tempven: '',
            tempro: '',
            tempda: '',
        })
    }

    const gotoReserve = (e) =>{
        e.preventDefault()

        navigate('../reserve')
    }


    return (
    <div class='checker-maincont'>
        <div class='form-cont-check'>
            <div class='checker-title'><h1>RESERVATION FORM</h1></div>

            <form class='form-fields'>
                <div className='input-field'>
                    <label>Date</label>
                    <input
                    type="date"
                    name='tempda'
                    id='tempda'
                    value={tempda}
                    onChange={onChange}
                    />
                </div>

                <div class='small-fields'>
                    <div className="input-field">
                        <label>Venue</label>
                        <select
                        type="text"
                        name='tempven'
                        id='tempven'
                        value = {tempven}
                        onChange = {onChange}>
                        <option hidden>- - - - -</option>
                            {bldgs}
                        </select>
                        </div>

                    <div className="input-field">
                        <label>Room</label>
                        <select
                        type="text"
                        name='tempro'
                        id='tempro'
                        value = {tempro}
                        onChange = {onChange}>
                        <option hidden>- - - - -</option>
                            {rooms}
                        </select>
                    </div>
                </div>

                <div className="chk-buttons">
                    <button className='check-pill' onClick={ifExist}>
                        Check Availability
                    </button>
                    <button className='check-clear' onClick={clear}>
                        Clear
                    </button>
                </div>
                
                {tempres.length > 0 ? (<div>
                    <div class='checked-table'>
                        <p id='notice'>There seems to be existing reservation/s</p>
                        <div class='check-table-head'>
                            <CheckerHead />
                            <div>
                            {existings.map((reserve) => (
                                <CheckerContent key={reserve._id} reserves={reserve}/>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>) : (<>
                    <div className="checked-table">
                        <p id='yestice'>There are no existing reservation/s</p>
                    </div>
                </>)}

                <button className="btnGo" onClick={gotoReserve}>Proceed to Reservation</button>
            </form>
        </div>
    </div>
  )
}

export default Checker