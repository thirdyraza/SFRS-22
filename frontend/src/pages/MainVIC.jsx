import { Outlet } from "react-router-dom";
import SidenavVIC from "../components/SidenavVIC";


const MainVIC = () => {
  return (

    <div className="app">
      <div id="side">
        <SidenavVIC/>
      </div>
      <div id="home">
        <Outlet/>
      </div>
    </div>
    
  );
}

export default MainVIC;