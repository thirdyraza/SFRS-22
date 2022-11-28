import { Outlet } from "react-router-dom";
import SidenavUser from "../components/SidenavUser";


const MainUser = () => {
  return (

    <div className="app">
      <div id="side">
        <SidenavUser/>
      </div>
      <div id="home">
        <Outlet/>
      </div>
    </div>
    
  );
}

export default MainUser;