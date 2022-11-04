import {useEffect} from 'react'
import {FaSignOutAlt} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import { getGoals } from '../features/goals/goalSlice'
import {logout, reset} from '../features/auth/authSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() =>{
    if(isError){
      console.log(message)
    }
    if(!user) {
      return navigate ('/login')
    }

    dispatch(getGoals())
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch])
  
  const onLogout =() => {
    dispatch(logout())
    dispatch(reset())
    navigate('/dashboard')
  }

  return (<>
    <section className="heading">
      <h1> Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
      <button className='btn' onClick={onLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </section>
    <GoalForm />

    <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (<h3>You dont have any goals</h3>)}
    </section>
  </>)
}

export default Dashboard