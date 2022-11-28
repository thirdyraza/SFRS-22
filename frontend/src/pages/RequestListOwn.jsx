import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReserves, reset } from '../features/reserves/reserveSlice';
import ReservesHead from '../components/ReservesHead';
import ReservesContent from '../components/ReservesContent';
import '../assets/scss/table.scss';



function RequestList() {
  const dispatch = useDispatch()

  const {reserves} = useSelector((state) => state.reserves)

  useEffect(() => {
    dispatch(getReserves())
    return () => {
      dispatch(reset())
    };
  }, [dispatch]);

  return (
    <div className="app">
    <div id="home">
    <div class='container'>
  <div class='title' id='personal-req'>
      YOUR <div class='yellow'>REQUESTS</div>
  </div>
  <div class='table-heading'>
    <ReservesHead />        
  </div>
  <div class='table-cell'>
    <req />
    {reserves.length > 0 ? (
      <div>
      {reserves.map((reserve) => (
        <ReservesContent key={reserve._id} reserves={reserve} />
      ))}
      </div>
    ) : (<h3>No Reservations Found</h3>)}
  </div>
  <div class='buttons'>
      <button></button>
  </div>
</div>
    </div>
  </div>
  
  )
}   

export default RequestList