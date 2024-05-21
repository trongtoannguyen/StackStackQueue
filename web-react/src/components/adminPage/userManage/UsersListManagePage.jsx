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


import { getAllUsers } from "../../../services/UserService";
import { createAxios } from "../../../services/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import UserCardItem from "./components/UserCardItem";
import UserListItem from "./components/UserListItem";

function UserListManage() {

  const [key, setKey] = useState('userList');
  const [showAdd, setShowAdd] = useState(false);

  const [userList, setUserList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [sortBy, setSortBy] = useState('ASC');



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

  let currentUser = useSelector(state => state.auth.login?.currentUser);
  // const userList = useSelector((state) => state.users.users?.allUsers);

  // const msg = useSelector((state) => state.users?.msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  // const handleDelete = (id) => {
  //   deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  // };


  const getAllUsersData = async () => {
    let pageData = {
      page: page,
      size: pageSize,
      orderBy: orderBy,
      sort: sortBy
    }
    console.log(`accessToken`, currentUser?.accessToken);
    let res = await getAllUsers(pageData, axiosJWT, currentUser?.accessToken);
    console.log(`ccheck`, JSON.stringify(res));
    if (res?.data.length > 0) {
      setUserList(res.data);
      setPageSize(res.pageSize);
      setTotalPages(res.totalPages);
      setTotalUsers(res.totalItems);
    }
  }

  useEffect(() => {
    if (currentUser && currentUser?.accessToken == null) {
      createAxios(currentUser, dispatch, loginSuccess);
    }
    getAllUsersData();
  }, []);



  const tableUserList = (users) => {
    return (
      <Table responsive striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
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
        <button to="/admin/user/add"
          onClick={() => setShowAdd(!showAdd)}
          className="btn btn-primary">{showAdd ? "Close" : "Add New"}</button>

        {showAdd &&
          <div className="">
            <div className="card col-8 mx-auto p-3">
              <p>Create a new user</p>
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input type="text" placeholder="Username" className="form-control" />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label htmlFor="username">Email</label>
                  <input type="text" placeholder="email" className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <label htmlFor="username">Password</label>
                  <input type="password" placeholder="Password" className="form-control" />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label htmlFor="username">Confirm Password</label>
                  <input type="password" placeholder="Confirm password" className="form-control" />
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="role">Role</label>
                <select name="role" id="role" className="form-select">
                  <option value="all">select role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="mod">Mod</option>
                </select>
              </div>

              <div>
                <button className="btn btn-secondary mx-2">Cancel</button>
                <button className="btn btn-primary">Create</button>
              </div>
            </div>
          </div>
        }

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
