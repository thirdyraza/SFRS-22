import { Outlet } from "react-router-dom";
import SidenavAdmin from "../components/SidenavAdmin";


const MainAdmin = () => {
  return (

    <div className="app">
      <div id="side">
        <SidenavAdmin/>
      </div>
      <div id="home">
        <Outlet/>
      </div>
    </div>
    
  );
}

export default MainAdmin;