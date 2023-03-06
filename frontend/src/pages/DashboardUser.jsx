import {useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {reset} from '../features/auth/authSlice'
import { getReservesDash } from '../features/reserves/reserveSlice'
import '../assets/scss/home.scss'
import bg from '../assets/images/bannerpic1.jpg'

import ReservesHead from '../components/ReservesHead'
import ReservesContent from '../components/ReservesContent'
import Loader from '../components/Loader'

function DashboardUser(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {reservesDash, isError, message, isLoading} = useSelector((state) => state.reserves)

  useEffect(() =>{

    if(isError){
      console.log(message)
    }
    if(!user) {
      return navigate('../login')
    }

    dispatch(getReservesDash())

    return () =>{
      dispatch(reset());
    }
    
  }, [user, navigate, isError, message, dispatch])

  if(isLoading){
    <Loader />
  }

  return (<>
    <div className="app">
      <div id="home">

        <div class='content-container'>
          <div class='home-banner' style={{ backgroundImage: `url(${bg})` }}>
            <p >WELCOME</p>
            <p class='louisian'>LOUISIAN</p>
          </div>

          {/* Dashboard button */}
          <div class='main-cont'>
            <Link to='../reserve'class='mainbtn'>
              <p>RESERVE FACILITY</p>
              <svg class="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"/></svg>
            </Link>
          </div>

          <div class='requests'>
            <div id='ownreq' class='user-req'>
              <h1>YOUR REQUESTS</h1>
              <ReservesHead />
                {reservesDash.length > 0 ? (
                  <div>
                  {reservesDash.map((reserve) => (
                    <ReservesContent key={reserve._id} reserves={reserve} />
                  ))}
                  </div>
                ) : (<h3 className='none'>No reservations found</h3>)}
                
                <Link to='../your-request-list'>
                  <div class='more'>See more ...</div> 
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default DashboardUser