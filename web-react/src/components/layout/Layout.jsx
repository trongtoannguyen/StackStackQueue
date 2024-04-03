import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import './Layout.scss'

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        <Outlet />
      </div>
      <Footer className="footer" />
    </div>
  )
}

export default Layout
