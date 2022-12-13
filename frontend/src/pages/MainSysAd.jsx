import { Outlet } from "react-router-dom";
import SidenavSysAd from "../components/SidenavSysAd";


const MainSysAd = () => {
  return (

    <div className="app">
      <div id="side">
        <SidenavSysAd/>
      </div>
      <div id="home">
        <Outlet/>
      </div>
    </div>
    
  );
}

export default MainSysAd;