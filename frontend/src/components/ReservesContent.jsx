import '../assets/scss/table.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllReserves, getReserves, getReservation } from '../features/reserves/reserveSlice'
import { useNavigate } from 'react-router-dom'

function ReservesContent({reserves, selectedValue}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const {reservation} = useSelector((state) => state.reserves)

    const gotoDetails = () =>{
        dispatch(getReservation())
        navigate('../details:' + selectedValue)
    }

    useEffect(() =>{

        dispatch(getAllReserves())
        dispatch(getReserves())
        
    }, [dispatch])

  
    return (
        <div class='info-container' onClick={gotoDetails}>
            <p>{reserves.requestor}</p>
            <p>{reserves.purpose}</p>
            <p>{reserves.org}</p>
            <p>{reserves.bldg}</p>
            <p>{reserves.room}</p>
            <p>{reserves.time_in} - {reserves.time_out}</p>
            <p>{reserves.status}</p>
        </div>
    );
}


export default ReservesContent