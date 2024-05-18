import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import {
  Row,
  Col,
} from "reactstrap";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import avatar from "../../../assets/img/default-avatar.png";
import { getAllUsers, deleteUser } from "../../../redux/apiUserRequest";
import { createAxios } from "../../../services/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import UserCardItem from "./components/UserCardItem";
import UserListItem from "./components/UserListItem";

function UserListManage() {

  const [key, setKey] = useState('userList');

  const users =
    [
      {
        id: 1,
        username: "admin123",
        email: "admin@localhost",
        role: "Admin",
        active: true,
      },
      {
        id: 2,
        username: "user123",
        email: "user@localhost",
        role: "User",
        active: true,
      },
      {
        id: 3,
        username: "user223",
        email: "user2@localhost",
        role: "User",
        active: false,
      },
      {
        id: 4,
        username: "user323",
        email: "user3@localhost",
        role: "User",
        active: false
      }
    ];

  // const user = useSelector((state) => state.auth.login?.currentUser);
  // const userList = useSelector((state) => state.users.users?.allUsers);

  // const msg = useSelector((state) => state.users?.msg);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // let axiosJWT = createAxios(user, dispatch, loginSuccess);

  // const handleDelete = (id) => {
  //   deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  // };

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  //   if (user?.accessToken) {
  //     getAllUsers(user?.accessToken, dispatch, axiosJWT);
  //   }
  // }, [user, navigate, axiosJWT, dispatch])



  const tableUserList = (users) => {
    return (
      <Table responsive striped bordered hover className="text-center">
        <thead>
          <tr>
            <th colSpan="2">Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => <UserListItem key={user.id} user={user} />)}
        </tbody>
      </Table>
    )
  }



  return (
    <div className='content'>
      <section>
        <Link to="/admin/user/add" className="btn btn-primary">Add new user</Link>
        <div>
          <p>Search</p>
          <input type="text" placeholder="Search user" />
        </div>
        <hr />
        <Tabs
          id="controlled-tab-user"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          justify
        >
          <Tab eventKey="userList" title="List">
            {tableUserList(users)}
          </Tab>
          <Tab eventKey="userGrid" title="Grid">
            <Col>
              <Row>
                {users?.map((user) => <UserCardItem key={user.id} user={user} />)}
              </Row>
            </Col>
          </Tab>
        </Tabs>


      </section>

    </div>
  );


}

export default UserListManage;
