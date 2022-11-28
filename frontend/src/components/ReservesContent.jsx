import '../assets/scss/table.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllReserves, getReserves } from '../features/reserves/reserveSlice'

function ReservesContent({reserves}) {

const dispatch = useDispatch()

useEffect(() =>{

    dispatch(getAllReserves())
    dispatch(getReserves())
    
  }, [dispatch])
  
    return (
        <div class='info-container'>
            <p id='requestor'>{reserves.user}</p>
            <p id='purpose'>{reserves.purpose}</p>
            <p id='building'>{reserves.bldg}</p>
            <p id='room'>{reserves.room}</p>
            <p id='time_in'>{reserves.time_in}</p>
            <p id='time_out'>{reserves.time_out}</p>
        </div>
    );
}


export default ReservesContent