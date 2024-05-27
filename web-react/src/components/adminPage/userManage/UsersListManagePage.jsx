import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import _debounce from 'lodash/debounce';

import Table from 'react-bootstrap/Table';

import {
  Row,
  Col,
  Card
} from "reactstrap";

import { Tab, Tabs } from 'react-bootstrap';


import { getAllUsers } from "../../../redux/apiUserRequest";
import { createAxios } from "../../../services/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { deleteUser } from "../../../services/UserService";


import UserCardItem from "./components/UserCardItem";
import UserListItem from "./components/UserListItem";
import Pagination from "../../pagination/Pagination";
import ModalConfirmDeleteUser from "./components/ModalConfirmDelete";
import ModalEditUser from "./components/ModalEditUser";
import { toast } from "react-toastify";

function UserListManage() {

  const [key, setKey] = useState('userList');
  const [showAdd, setShowAdd] = useState(false);

  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [sortBy, setSortBy] = useState('ASC');

  const [keyword, setKeyword] = useState('');
  const [msg, setMsg] = useState('');


  const [userDelete, setUserDelete] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [userEdit, setUserEdit] = useState({});
  const [showEdit, setShowEdit] = useState(false);


  const handleShowHide = () => setShowModal(!showModal);
  const handleSetDeleteUser = (user) => setUserDelete(user);

  const handleShowHideEdit = () => setShowEdit(!showEdit);
  const handleSetEditUser = (user) => setUserEdit(user);




  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
    return true;
  }

  const handleSort = (sortBy, orderBy) => {
    setSortBy(sortBy);
    setOrderBy(orderBy);
    return true;
  }

  let currentUser = useSelector(state => state.auth.login?.currentUser);
  const usersData = useSelector((state) => state.users.users?.allUsers);

  // const msg = useSelector((state) => state.users?.msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const getAllUsersData = async (value) => {
    let pageData = {
      search: value,
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
      setMsg("")
    } else if (value.length > 0) {
      setMsg(`Can't find user by ${value}`);
    }
    return true;
  }


  const handleDelete = async (user) => {
    if (user.id === null) {
      return;
    }
    if (user.id === currentUser.id || +user.id === 1) {
      return toast.error("Can't delete admin");
    }
    let res = await deleteUser(currentUser?.accessToken, user.id, axiosJWT);
    if (+res.status !== 500) {
      setShowModal(false);
      toast.success("Deleted successfully!");
      getAllUsersData();
    } else {
      toast.error(res?.data?.message);
    }
    return true;
  };

  const handleUpdateStatus = (id, accountStatus) => {
    alert(`handleUpdateStatusUser action`);
    // patchUpdateStatusUser(id, accountStatus, axiosJWT);
  }


  const debounceFn = useCallback(_debounce(handleSearch, 1000), []);

  function handleSearch(value) {
    getAllUsersData(value);
    return true;
  }

  const handleChange = (event) => {
    setMsg("");
    setKeyword(event.target.value)
    debounceFn(event.target.value);
    return true;
  };



  useEffect(() => {
    if (!currentUser.accessToken) {
      createAxios(currentUser, dispatch, loginSuccess);
    }
    getAllUsersData("");

  }, [page, pageSize, orderBy, sortBy]);



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
      <Table responsive striped borderless hover>
        <thead>
          <tr>
            <th>
              <span>Username&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "username")}
                  onKeyDown={() => { handleSort("DESC", "username") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "username")}
                  onKeyDown={() => { handleSort("ASC", "username") }}
                ></i>
              </span>
            </th>
            <th>
              <span>Email&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "email")}
                  onKeyDown={() => { handleSort("DESC", "email") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "email")}
                  onKeyDown={() => { handleSort("ASC", "email") }}
                ></i>
              </span>
            </th>
            <th>
              <span>Role&nbsp;</span>
            </th>
            <th>
              <span>Status&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "accountStatus")}
                  onKeyDown={() => { handleSort("DESC", "accountStatus") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "accountStatus")}
                  onKeyDown={() => { handleSort("ASC", "accountStatus") }}
                ></i>
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => <UserListItem key={user.id} user={user}
            handleShowHide={handleShowHide}
            handleSetDeleteUser={handleSetDeleteUser}
            handleShowHideEdit={handleShowHideEdit}
            handleSetEditUser={handleSetEditUser}
          />)}
        </tbody>
      </Table>
    )
  }


  return (
    <div className='content'>
      <section>
        <h3>User List</h3>
        <Col className="my-3">
          {!showAdd &&
            <div className="ml-auto me-0 col-md-4">
              <button to="/admin/user/add"
                onClick={() => setShowAdd(!showAdd)}
                className="btn btn-primary">{showAdd ? "Close" : "Add New"}</button>
            </div>
          }
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
                  <button className="btn btn-secondary mx-2"
                    onClick={() => setShowAdd(!showAdd)}
                  >Cancel</button>
                  <button className="btn btn-primary">Create</button>
                </div>
              </div>
              <hr />
            </div>
          }
          <Row className="d-flex">
            <div className="ml-0 me-auto col-ms-2 d-flex align-items-center mb-3">
              <label htmlFor="page" className="col-2">Page size:</label>
              <select id="page" name="page"
                className="form-input-select col-1"
                onChange={(e) => setPageSize(e.currentTarget.value)}
              >
                <option value="5">05</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="col-ms-4 mb-3">
              <input className="mx-2 form-control col-10 p-3"
                value={keyword}
                onChange={handleChange}
                id="search_user" name="keyword" placeholder="Search user by username or email"
              />
            </div>
          </Row>
          <div className="text-danger">{msg}</div>

        </Col>


        <div>
          <Tabs
            id="controlled-tab-user"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            justify
          >
            <Tab eventKey="userList"
              title={<i className="fa-solid fa-list fa-2x"></i>}>
              {tableUserList(userList)}
              <Pagination
                handlePageClick={handlePageClick}
                pageSize={pageSize}
                totalPages={totalPages}
              />
            </Tab>
            <Tab eventKey="userGrid" title={<i className="fa-solid fa-grip fa-2x"></i>}>
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
                      : userList?.map((user) => <UserCardItem key={user.id} user={user}
                        handleShowHide={handleShowHide}
                        handleSetDeleteUser={handleSetDeleteUser}
                        handleShowHideEdit={handleShowHideEdit}
                        handleSetEditUser={handleSetEditUser}
                      />)
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
        </div>


      </section>


      <ModalConfirmDeleteUser
        show={showModal}
        handleClose={handleShowHide}
        handleDelete={handleDelete}
        user={userDelete}
      />

      <ModalEditUser
        show={showEdit}
        handleClose={handleShowHideEdit}
        handleUpdateStatus={handleUpdateStatus}
        user={userEdit}
      />



    </div>
  );


}

export default UserListManage;
