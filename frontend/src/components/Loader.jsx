import logo from '../assets/images/logo.png'
import '../assets/scss/loader.scss'

function Loader() {
  return (
    <div className='loader-cont'>
        <img src={logo} alt="usl reserves logo" />
        <h3>USL Reserves</h3>
        <h4>Loading...</h4>
    </div>
  )
}

export default Loader