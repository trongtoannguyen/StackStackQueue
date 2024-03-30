import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import LoginForm from "../components/auth/LoginForm";


function AppRoutes() {
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default AppRoutes;