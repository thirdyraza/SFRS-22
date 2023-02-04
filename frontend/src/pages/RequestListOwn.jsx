import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReserves, getForCheck, getForDean, getForReview, getReserves, getSorted, reset } from '../features/reserves/reserveSlice';
import ReservesHead from '../components/ReservesHead';
import ReservesContent from '../components/ReservesContent';
import '../assets/scss/table.scss';
import '../assets/scss/buttons.scss'
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function RequestList() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { allReserves, forReviews, forChecks, forDeans, reserves, sorted, isLoading} = useSelector((state) => state.reserves)

  var active = 'All'
  const sortPage = (e) =>{
    active = e.target.name
    dispatch(getSorted(active))
  }

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
      
      let header = document.getElementById("buttons");
      let btns = header.getElementsByClassName("btn");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
        });
      }
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
                    <div className="btn-cont" id='buttons'>
                      <button className="btn active" onClick={sortPage} name='All'>All</button>
                      <button className="btn" onClick={sortPage} name='Pending'>Pending</button>
                      <button className="btn" onClick={sortPage} name='Approved'>Approved</button>
                      <button className="btn" onClick={sortPage} name='Denied'>Denied</button>
                      <button className="btn" onClick={sortPage} name='Cancelled'>Cancelled</button>
                    </div>
                    <div class='table-heading'>
                      <ReservesHead />
                    </div>
                    <div class='table-cell'>
                      {active === 'Approved' ? (<>
                        {sorted.length > 0 ? (
                              <div>
                              {sorted.map((reserve) => (
                                <ReservesContent key={reserve._id} reserves={reserve} />
                              ))}
                              </div>
                            ) : (<h2 className='none'>No Approved Reservations</h2>)}
                      </>) : (<>
                        {active === 'Denied' ? (<>
                          {sorted.length > 0 ? (
                              <div>
                              {sorted.map((reserve) => (
                                <ReservesContent key={reserve._id} reserves={reserve} />
                              ))}
                              </div>
                            ) : (<h2 className='none'>No Denied Reservations</h2>)}
                        </>) : (<>
                          {active === 'Cancelled' ? (<>
                            {sorted.length > 0 ? (
                              <div>
                              {sorted.map((reserve) => (
                                <ReservesContent key={reserve._id} reserves={reserve} />
                              ))}
                              </div>
                            ) : (<h2 className='none'>No Cancelled Reservations</h2>)}
                          </>) : (<>
                            {sorted.length > 0 ? (
                              <div>
                              {sorted.map((reserve) => (
                                <ReservesContent key={reserve._id} reserves={reserve} />
                              ))}
                              </div>
                            ) : (<h2 className='none'>No Reservations</h2>)}
                          </>)}
                        </>)}
                      </>)}    
                      
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