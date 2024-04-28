import React from "react";

import PerfectScrollbar from "perfect-scrollbar";

import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./sidebar/Sidebar"
import routes from "../routes/routes";

import AdminHeader from './header/AdminHeader';
import AdminFooter from "./footer/AdminFooter";
import FixedPlugin from "../components/adminPage/FixedPlugin/FixedPlugin";


let ps;
const AdminLayout = (props) => {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");

  const mainPanel = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  React.useEffect(() => {
    (mainPanel.current || {}).scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const handleActiveClick = (color) => {
    setActiveColor(color);
  }

  const handleBgClick = (color) => {
    setBackgroundColor(color);
  }

  return (
    <div className="layout-admin wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <AdminHeader {...props} />

        <Outlet />

        <AdminFooter fluid />
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      />
    </div>
  )
}

export default AdminLayout;