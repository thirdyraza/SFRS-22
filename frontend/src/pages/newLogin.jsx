import '../assets/scss/newlogin.scss';
import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.png'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import shape1 from '../assets/images/shapes1.png'
import shape2 from '../assets/images/shapes2.png'
import shape3 from '../assets/images/shapes3.png'
import vector from '../assets/images/vector.svg'

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
      
      if(isSuccess || user){
        if(user.role === 'Faculty'
          || user.role === 'Student Officer'){
            const role = 'user'
            navigate('/' + role + '/dashboard')
        } else if(user.role === 'OSAS Staff' || user.role === 'OSAS Director'
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

  return (
    <div className='landing_container'>
        <div className='landing_nav'>
            <div className='nav_left'>
                
            </div>
            <div className='nav_right'>
                <p>FAQ</p>
                <p>Visit our Site</p>
            </div>
        </div>

        <div className='landing_content'>
              <div className='lc_left'>
                <div className="main-login">
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
                          onChange={onChange} />
                          <br />
                        </div>
                    
                        <div class="login-inputs">
                          <label>Password</label>
                          <input
                          type= 'password'
                          id='password'
                          name='password'
                          value = {password}
                          placeholder="Enter Password"
                          required
                          onChange={onChange} />
                          <br />
                          <a href="/">FORGOT PASSWORD?</a>
                        </div>                
                      </div>
                      <div className='btn-cont'>
                        <button type='submit' class="login-button">SIGN IN</button>
                      </div>           
                    </form>
                    </div>
                  </div>

                </div>

        
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
                      
              </div>
            
            <div className='lc_right'>
                <img src={logo} alt=' '/>
            </div>
        </div>

        {/* Shape Design */}

        <img className='shape1' src={shape1} alt=' '/>
        <img className='shape2' src={shape2} alt=' '/>
        <img className='shape3' src={shape3} alt=' '/>

        <img className='vector' src={vector} alt=' '/>        
    </div>

    );
  }//app end
  
  export default LoginPage
;