import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MainAdmin from './pages/MainAdmin';
import UsersList from './pages/UsersList';
import MainForm from './pages/MainForm';
import RequestList from './pages/RequestListOwn';
import Notifications from './pages/Notifications';
import Registry from './pages/Registry';
import MainUser from './pages/MainUser';

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/login' element={<Login />}/>

            {/* private routes */}

            <Route path='/admin' element={<MainAdmin/>}>
              <Route path='dashboard' element={<DashboardAdmin/>}></Route>
              <Route path='reserve' element={<MainForm/>}></Route>
              <Route path='registry' element={<Registry/>}></Route>
              <Route path='your-request-list' element={<RequestList/>}></Route>
              <Route path='users-list' element={<UsersList/>}></Route>
              <Route path='notifications' element={<Notifications/>}></Route>
            </Route>

            <Route path='/user' element={<MainUser/>}>
              <Route path='dashboard' element={<DashboardUser/>}></Route>
              <Route path='reserve' element={<MainForm/>}></Route>
              <Route path='your-request-list' element={<RequestList/>}></Route>
              <Route path='notifications' element={<Notifications/>}></Route>
            </Route>

          </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

