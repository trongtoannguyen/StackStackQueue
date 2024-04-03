import { Route, Routes } from "react-router-dom";
import NotFound from "../components/errorPage/NotFound";
import DashBoard from "../components/admin/adminDashBoard/DashBoard";
import AdminLayout from "../components/layout/AdminLayout";
import TableUsers from "../components/admin/userManage/TableUsers";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route exact path="/" element={<DashBoard />} />
        <Route exact path="/user-list" element={<TableUsers />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes;