import '../assets/scss/landing.scss';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import Statue from '../assets/images/USL_Welcome.png'
import shape1 from '../assets/images/shapes1.png'
import shape2 from '../assets/images/shapes2.png'
import shape3 from '../assets/images/shapes3.png'
import vector from '../assets/images/vector.svg'

function LandingPage() {

  const navigate = useNavigate()
  function Signin() {
    navigate('/login')
  }
    return (
    <div className='landing_container'>
        <div className='landing_nav'>
            <div className='nav_left'>
                <img src={logo} alt='#'/>
            </div>

            <div className='nav_right'>
                <p>FAQ</p>
                <a href='http://usl.edu.ph/' target="_blank" rel="noreferrer">Visit our Site</a>
            </div>
        </div>

        <div className='landing_content'>
              <div className='lc_left'>
                <div className='left-container'>
                    <div className='lc_title'>
                    <p>Come Join Us! <span className='lc_design'>Join USL</span></p>
                    </div>
                    <span className='light'>Everything, right where you need it.</span>
                    <p className='lc_details'>School Facilities Reservation System that aids the University Stakeholders in processing facility reservations by computerizing the processes of reserving buildings and rooms for different purposes.</p>
                    <div>
                      <button className='btnLanding' onClick={Signin}>SIGN-IN</button>
                    </div>
                </div>

      
                <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
                {/* contacts */}
                <div class='yourReqs'>

                    <h2>Don't have an account? Contact us at </h2>
                    <div class="contact">
                      <div className='contact-cont'>
                        <div class="contact-icon">
                          <i class='bx bxs-envelope' ></i>
                        </div>
                        <div class="contact-info">
                          <h3>TeamCepheus@usl.edu.ph</h3>
                          <h6>Responds within 1-2 days</h6>
                        </div>
                      </div>
                      <div className='contact-cont'>
                        <div class="contact-icon">
                          <i class='bx bxs-phone'></i>
                        </div>
                        <div class="contact-info">
                          <h3>+63 9230824660</h3>
                          <h6>Weekdays 7:00 AM to 7:00 PM,</h6>
                          <h6>Weekends 9:00 AM to 6:00 PM</h6>
                        </div>
                      </div>

                    </div>

                </div>
                      
              </div>
            
            <div className='lc_right'>
                <img src={Statue} alt=' '/>
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
  
  export default LandingPage;