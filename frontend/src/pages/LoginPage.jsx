import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import '../assets/scss/loginpage.scss'
import logo from '../assets/images/logo.png'

function LoginPage() {

    const [formData, setFormData] = useState({
        idnum: '',
        password: '',
    })
    const { idnum, password } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() =>{
        if(isError){
          toast.error(message)
        }
        if(!user){
          return navigate('/login')
        }
        
        if(isSuccess || user){
          if(user.role === 'Faculty'
            || user.role === 'Student Officer'){
              const role = 'user'
              navigate('/' + role + '/dashboard')
          } else if(user.role === 'OSAS Staff' || user.role === 'OSAS Dean'
            || user.role === 'Department Dean'
            || user.role === 'Organization Adviser' || user.role === 'Head of Office'){
              const role = 'admin'
              navigate('/' + role + '/dashboard')
          } else if(user.role === 'Outdoor Stage In-Charge' || user.role === 'Gym In-Charge'){
            const role = 'venue-incharge'
            navigate('/' + role + '/dashboard')
          } else if(user.role === 'System Admin'){
            const role = 'system-admin'
            navigate('/' + role + '/dashboard')
          }
        }

        return () => {
          dispatch(reset())
        }

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        
        const userData = {
            idnum,
            password,
        }
        dispatch(login(userData))
    }

  return (<>
    
    <div className="login-page-body">
        <div className="login-page-container">

            <div className="login-titling">
                <div className="biglogo">
                    <img src={logo} alt="" />
                </div>
    
                <div className="login-texts">
                    <div className="bigtext">
                        <p>UNIVERSITY OF</p>
                        <p className="saint">SAINT LOUIS</p>
                    </div>
                    <div className="smalltext">
                        <p>School Facility Reservation System</p>
                    </div>
                </div>
            </div>
    
            <div className="login-container">
                <form className="login-wrap" onSubmit={onSubmit}>
                    <div className="branding">
                        <h1>SIGN-IN</h1>
                        <p> PLEASE ENTER YOUR CREDENTIALS</p>
                    </div>

                    <div className="login-inputs-cont">
                        <div className="login-inputs">
                            <label htmlFor="fname">ID NUMBER</label>
                            <input type="text" id="idnum"
                            name="idnum"
                            value={idnum}
                            onChange={onChange}
                            required
                            placeholder="ENTER YOUR ID NUMBER"
                            /><br></br>
                        </div>
                        <div className="login-inputs">
                            <label htmlFor="fname">PASSWORD</label>
                            <input type="password" id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            placeholder="ENTER YOUR PASSWORD"                            
                            /><br></br>
                        </div>
                    </div>
                    <a href="/" className="forgot">FORGOT PASSWORD?</a>

                    <button className="login-button" type='submit'>
                        <p>SIGN IN</p>
                    </button>
                </form>
            </div>

        </div>
    </div>

    </>)
}

export default LoginPage