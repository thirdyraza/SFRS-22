import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.png'
import '../assets/scss/login.scss'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        idnum: '',
        password: '',
    })
    const { idnum, password } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() =>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/dashboard')
        }
        dispatch(reset())

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

  return (
    <body>
      <div class="main-login">
        <div class="titling">
              <div class="biglogo">
                <img src={logo} alt="" />
              </div>

              <div class="texts">
                  <div class="bigtext">
                      <p>UNIVERSITY OF</p>
                      <p class="saint">SAINT LOUIS</p>
                  </div>
                  <div class="smalltext">
                      <p>Facility Reservation System</p>
                  </div>
              </div>
        </div>
        <div class="login-container">
          <div class="login-wrap">
            <div class="branding">
              <h1>SIGN-IN</h1>
              <p>PLEASE ENTER YOUR CREDENTIALS</p>         
            </div>
            <form onSubmit={onSubmit}>                  
              <div class="inputs-cont">
                <div class="login-inputs">
                  <label>ID Number</label>
                  <input
                  type="text"                  
                  id='idnum'
                  name='idnum'                  
                  value = {idnum}
                  placeholder="Enter ID Number"
                  required
                  onChange={onChange}
                  onInvalid={e => e.target.setCustomValidity('Please enter ID Number')}
                  onInput={e => e.target.setCustomValidity('')} />
                  <br />
                </div>
            
                <div class="login-inputs">
                  <label>Password</label>
                  <input                  
                  type="password"
                  id='password'
                  name='password'
                  value = {password}
                  placeholder="Enter Password"
                  required
                  onChange={onChange}
                  onInvalid={e => e.target.setCustomValidity('Please enter Password')}
                  onInput={e => e.target.setCustomValidity('')} />
                  <br />
                  <a href="/login">FORGOT PASSWORD?</a>
                </div>                
              </div>
              <div>
                <button type='submit' class="login-button">Sign In</button>
              </div>              
            </form>
            </div>
          </div>
      </div>
    </body>
  );
}

export default Login;