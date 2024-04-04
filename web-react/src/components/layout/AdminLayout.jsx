import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import './AdminLayout.scss'


const AdminLayout = () => {
  return (
    <div className="layout-admin">
      <Header />
      <div className="main-content">
        <Sidebar className="col-12 col-md-3" />
        <div className="col-12 col-md-9">
          <Outlet />
        </div>
      </div>
      <Footer className="footer" />
    </div>
  )
}

export default AdminLayout;