import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReserves, getForCheck, getForDean, getForReview, getReserves, reset } from '../features/reserves/reserveSlice';
import ReservesHead from '../components/ReservesHead';
import ReservesContent from '../components/ReservesContent';
import '../assets/scss/table.scss';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function RequestList() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { allReserves, forReviews, forChecks, forDeans, reserves, isLoading} = useSelector((state) => state.reserves)

  useEffect(() => {

    if(!user){
      navigate('/login')
    }

    if(user.role === 'Gym In-Charge' || user.role === 'Friendship Park In-Charge' || user.role === 'Outdoor Stage In-Charge'){
      dispatch(getForCheck())
    } else if(user.role === 'OSAS Dean' ){
      dispatch(getAllReserves())
    } else if(user.role === 'Organization Adviser' || user.role === 'Head of Office'){
      dispatch(getForReview())
    } else if(user.role === 'Department Dean'){
      dispatch(getForDean())
    } else if(user.role === 'Student Officer' || user.role === 'Faculty'){
      dispatch(getReserves())
    }

    return () => {
      dispatch(reset())
    };

  }, [dispatch, user, navigate]);

  var role

  if(user.role === 'Gym In-Charge' || user.role === 'Friendship Park In-Charge' || user.role === 'Outdoor Stage In-Charge'){
    role = 'venue'
  } else if(user.role === 'OSAS Dean' ){
    role = 'osas'
  } else if(user.role === 'Organization Adviser' || user.role === 'Head of Office'){
    role = 'head'
  } else if(user.role === 'Department Dean'){
    role = 'dean'
  }

  if(isLoading){
    <Loader />
  }

  return (
    <div className="app">
      <div id="home">
          {role === 'osas' ? (<>
            <div class='container'>
              <div class='title' id='personal-req'>
                  ALL <div class='yellow'>USER REQUESTS</div>
              </div>
              <div class='table-heading'>
                <ReservesHead />        
              </div>
              <div class='table-cell'>
                <req />
                {allReserves.length > 0 ? (
                  <div>
                  {allReserves.map((reserve) => (
                    <ReservesContent key={reserve.id} reserves={reserve} />
                  ))}
                  </div>
                ) : (<h2 className='none'>No Reservations Found</h2>)}
              </div>
            </div>
          </>) : (<>
            {role === 'head' ? (<>
              <div class='container'>
                <div class='title' id='personal-req'>
                    USER <div class='yellow'>REQUESTS</div>
                </div>
                <div class='table-heading'>
                  <ReservesHead />        
                </div>
                <div class='table-cell'>
                  <req />
                  {forReviews.length > 0 ? (
                    <div>
                    {forReviews.map((reserve) => (
                      <ReservesContent key={reserve._id} reserves={reserve} />
                    ))}
                    </div>
                  ) : (<h2 className='none'>No Reservations Found</h2>)}
                </div>
              </div>
            </>) : (<>
              {role === 'dean' ? (<>
                <div class='container'>
                  <div class='title' id='personal-req'>
                      USER <div class='yellow'>REQUESTS</div>
                  </div>
                  <div class='table-heading'>
                    <ReservesHead />        
                  </div>
                  <div class='table-cell'>
                    <req />
                    {forDeans.length > 0 ? (
                      <div>
                      {forDeans.map((reserve) => (
                        <ReservesContent key={reserve._id} reserves={reserve} />
                      ))}
                      </div>
                    ) : (<h2 className='none'>No Reservations Found</h2>)}
                  </div>
                </div>
              </>) : (<>
                {role === 'venue' ? (<>
                  <div class='container'>
                    <div class='title' id='personal-req'>
                        USER <div class='yellow'>REQUESTS</div>
                    </div>
                    <div class='table-heading'>
                      <ReservesHead />        
                    </div>
                    <div class='table-cell'>
                      <req />
                      {forChecks.length > 0 ? (
                        <div>
                        {forChecks.map((reserve) => (
                          <ReservesContent key={reserve._id} reserves={reserve} />
                        ))}
                        </div>
                      ) : (<h2 className='none'>No Reservations Found</h2>)}
                    </div>
                  </div>
                </>) : (<>
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
                      ) : (<h2 className='none'>No Reservations Found</h2>)}
                    </div>
                  </div>
                </>)}
              </>) }
            </>)}
          </>)}
      </div>
    </div>
  
  )
}   

export default RequestList