import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Col, Row, Card, ListGroup } from "react-bootstrap";

import { getEmailOptionById, putUpdateEmailOption } from "../../../services/emailService/EmailOptionService";
import { createAxios } from "../../../services/createInstance";
import { loginSuccess } from "../../../redux/authSlice";



const EmailOption = () => {

  const [emailOption, setEmailOption] = useState({});

  const [host, setHost] = useState(0);
  const [port, setPort] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tlsEnable, setTlsEnable] = useState(true);
  const [authentication, setAuthentication] = useState(true);

  const [show, setShow] = useState(false);
  // const [showTest, setShowTest] = useState(false);


  let currentUser = useSelector(state => state.auth.login?.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);


  const getEmailOption = async () => {
    const accessToken = currentUser?.accessToken;
    let res = await getEmailOptionById(accessToken, axiosJWT);
    if (+res.status === 200) {
      setEmailOption(res?.data?.data);
      const { host, port, username, password, tlsEnable, authentication } = res.data.data;
      setHost(host);
      setPort(port);
      setUsername(username);
      setPassword(password);
      setTlsEnable(tlsEnable);
      setAuthentication(authentication);
    } else {
      console.log(`Error: `, res?.data?.message);
      navigate("/login");
    }

    return true;
  }

  const handleUpdateEmailOption = async () => {
    console.log(`Check`);

    const emailOption = {
      host: host,
      port: port,
      username: username,
      password: password,
      tlsEnable: tlsEnable,
      authentication: authentication
    }
    const accessToken = currentUser?.accessToken;
    let res = await putUpdateEmailOption(emailOption, accessToken, axiosJWT);
    console.log(`Check res`, res.data);
    if (+res.status === 200) {
      setEmailOption(res.data);
      toast.success(res?.message);
    } else {
      console.log(`Error: `, res?.data?.message);
    }
  }


  useEffect(() => {
    if (!currentUser.accessToken) {
      createAxios(currentUser, dispatch, loginSuccess);
    }
    getEmailOption();
  }, []);


  return (
    <div className="content">

      <h3>Email Option Manage</h3>
      <Col>
        <p></p>
        {emailOption != null ?
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Host: {emailOption?.host}</ListGroup.Item>
            <ListGroup.Item as="li">Port: {emailOption?.port}</ListGroup.Item>
            <ListGroup.Item as="li">Username: {emailOption?.username}</ListGroup.Item>
          </ListGroup>
          : <div className="text-center">
            <span className="d-flex justify-content-center">
              <i className="fas fa-sync fa-spin fa-5x"></i>
              <br />
            </span>
            <h5>Loading...</h5>
          </div>
        }

        {!show &&
          <Row className="d-flex justify-content-end">
            <Button className="col-md-2 me-3" variant="secondary" onClick={() => setShow(!show)}>{show ? "Close" : "Update"}</Button>
          </Row>
        }

        {show &&
          <Card className="my-3">
            <h5 className="text-center m-3">Update Email Option</h5>
            <Row className="p-3">
              <div className="form-group mb-3 col-md-6">
                <label htmlFor="host">Host of email: <span className="text-danger">(*)</span></label>
                <input value={host} name="host" className="form-control" required onChange={(e) => setHost(e.target.value)} />
              </div>
              <div className="form-group mb-3 col-md-6">
                <label htmlFor="port">Port of port: <span className="text-danger">(*)</span></label>
                <input value={port} name="port" className="form-control" required onChange={(e) => setPort(e.target.value)} />
              </div>
            </Row>
            <Row className="p-3">
              <div className="form-group mb-3 col-md-6">
                <label htmlFor="username">Username of Email <span className="text-danger">(*)</span></label>
                <input value={username} name="username" className="form-control" required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group mb-3 col-md-6">
                <label htmlFor="password">Password of email <span className="text-danger">(*)</span></label>
                <input type="password" value={password} name="password" className="form-control" required onChange={(e) => setHost(e.target.value)} />
              </div>
            </Row>
            <Row className="d-flex justify-content-end">
              <button className="btn btn-secondary col-3 me-5"
                onClick={() => setShow(false)}>Cancel</button>
              <Button className="col-3 me-5"
                onClick={handleUpdateEmailOption}>Update</Button>
            </Row>
          </Card>
        }

      </Col>
      <h3></h3>

    </div>
  )


}

export default EmailOption;