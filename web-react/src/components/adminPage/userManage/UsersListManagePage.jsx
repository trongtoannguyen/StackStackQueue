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


import { getAllUsers } from "../../../redux/apiUserRequest";
import { createAxios } from "../../../services/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import UserCardItem from "./components/UserCardItem";
import UserListItem from "./components/UserListItem";
import Pagination from "../../pagination/Pagination";

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

  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
    return true;
  }

  let currentUser = useSelector(state => state.auth.login?.currentUser);
  let isError = useSelector(state => state.auth.login.error);
  const allUsers = useSelector((state) => state.users.users?.allUsers);

  // const msg = useSelector((state) => state.users?.msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  // const handleDelete = (id) => {
  //   deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  // };

  //export const getAllUsers = async (accessToken, dispatch, axiosJWT, pageData) => {

  const getAllUsersData = async () => {
    let pageData = {
      page: page,
      size: pageSize,
      orderBy: orderBy,
      sort: sortBy
    }
    let res = await getAllUsers(currentUser?.accessToken, dispatch, axiosJWT, pageData);
    if (res?.data.length > 0) {
      setUserList(res.data);
      setPageSize(res.pageSize);
      setTotalPages(res.totalPages);
      setTotalUsers(res.totalItems);
    }
    return true;
  }

  useEffect(() => {
    if (!currentUser.accessToken) {
      createAxios(currentUser, dispatch, loginSuccess);
    }
    getAllUsersData();

  }, []);



  const tableUserList = (users) => {
    if (users.length == 0) {
      return (
        <div className="text-center">
          <span className="d-flex justify-content-center">
            <i className="fas fa-sync fa-spin fa-5x"></i>
            <br />
          </span>
          <h5>Loading...</h5>
        </div>
      );
    }
    return (
      <Table responsive striped bordered hover>
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
            {tableUserList(userList)}

            <Pagination
              handlePageClick={handlePageClick}
              pageSize={pageSize}
              totalPages={totalPages}
            />
          </Tab>
          <Tab eventKey="userGrid" title="Grid">
            <Col>
              <Row>
                {
                  (userList.length === 0)
                    ? <div className="text-center">
                      <span className="d-flex justify-content-center">
                        <i className="fas fa-sync fa-spin fa-5x"></i>
                        <br />
                      </span>
                      <h5>Loading...</h5>
                    </div>
                    : userList?.map((user) => <UserCardItem key={user.id} user={user} />)
                }

                <Pagination
                  handlePageClick={handlePageClick}
                  pageSize={pageSize}
                  totalPages={totalPages}
                />

              </Row>
            </Col>
          </Tab>
        </Tabs>


      </section>
    </div>
  );


}

export default UserListManage;
