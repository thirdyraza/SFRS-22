import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/DashboardAdmin';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MainAdmin from './pages/MainAdmin';
import Register from './pages/Register';
import UsersList from './pages/UsersList';
import MainForm from './pages/MainForm';

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/login' element={<Login />}/>

            {/* private routes */}
            <Route path='/admin' element={<MainAdmin/>}>
              <Route path='dashboard' element={<Dashboard/>}></Route>
              <Route path='registration' element={<Register/>}></Route>
              <Route path='users-list' element={<UsersList/>}></Route>
              <Route path='reserve' element={<MainForm/>}></Route>
            </Route>

          </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

