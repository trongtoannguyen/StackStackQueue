import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import avatar from '../../assets/img/default-avatar.png';
import ModalEditProfile from './ModalEditProfile';
import { useState } from 'react';


export const MyProfile = () => {

  const currentUser = useSelector(state => state.auth.login?.currentUser);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  }

  const handleUpdateInfo = (newInfo) => {
    console.log(`Here is new info: ${newInfo}`);
  }


  return (
    <div className="content">
      <Col md="12">
        <Card className="card-user">
          <div className="image">
            <img alt="banner" src="" />
          </div>
          <CardBody>
            <Row>
              <Col md="4" lg="3" className='text-center'>
                <a href={currentUser?.imageUrl}>
                  <img
                    alt="avatar"
                    className="avatar border-gray"
                    src={(currentUser?.imageUrl ?? currentUser?.avatar) ?? avatar}
                  />
                </a>
              </Col>
              <Col md="8" lg="9" className='text-md-left text-center'>
                <h5 className="title">{currentUser?.name ?? currentUser?.username}</h5>
                <p className="description">Email: {currentUser?.email}</p>
                <p className="description">Address: Ho Chi Minh</p>
              </Col>
              <div>
                <button className="btn btn-none"
                  onClick={() => { setShowModal(true) }}>
                  <i className="fa-solid fa-pen-to-square fa-xl"></i>
                </button>
              </div>
            </Row>
          </CardBody>
          <CardFooter>
            <hr />
            <div className="text-center">
              <Row>
                <Col className="ml-auto" lg="3" md="6" xs="6">
                  <h5>
                    12 <br />
                    <small>Posts</small>
                  </h5>
                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                  <h5>
                    2 <br />
                    <small>Point</small>
                  </h5>
                </Col>
                <Col className="mr-auto" lg="4">
                  <h5>
                    24,6 <br />
                    <small>Spent</small>
                  </h5>
                </Col>
              </Row>
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Row>
        <Col md="12">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="banner" src="" />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="avatar"
                        className="avatar border-gray"
                        src={currentUser.avatar || avatar}
                      />
                      <h5 className="title">{currentUser?.username}</h5>
                    </a>
                    <p className="description">{currentUser?.email}</p>
                  </div>
                  <p className="description text-center">
                    I like the way you work it <br />
                    No diggity <br />I wanna bag it up
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Posts</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2 <br />
                          <small>Point</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="4">
                        <h5>
                          24,6 <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Follower</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src=""
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          DJ Khaled <br />
                          <span className="text-muted">
                            <small>Offline</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src=""
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          Creative Tim <br />
                          <span className="text-success">
                            <small>Available</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src=""
                            />
                          </div>
                        </Col>
                        <Col className="col-ms-7" xs="7">
                          Flume <br />
                          <span className="text-danger">
                            <small>Busy</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>

            <Col md="8">

              <Card className="card-activities">
                <CardHeader>Activities History</CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <p className="text-info">
                              <i className="fa fa-user-circle" />
                            </p>
                          </td>
                          <td>
                            <p className="text-info">
                              <b>Admin</b> has updated users
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-link"
                              color="info"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="fa fa-share" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="text-success">
                              <i className="fa fa-user-circle" />
                            </p>
                          </td>
                          <td>
                            <p className="text-success">
                              <b>Admin</b> has updated users
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-link"
                              color="info"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="fa fa-share" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="text-danger">
                              <i className="fa fa-user-circle" />
                            </p>
                          </td>
                          <td>
                            <p className="text-danger">
                              <b>Admin</b> has updated users
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-link"
                              color="info"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="fa fa-share" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="text-warning">
                              <i className="fa fa-user-circle" />
                            </p>
                          </td>
                          <td>
                            <p className="text-warning">
                              <b>Admin</b> has updated users
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-link"
                              color="info"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="fa fa-share" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="text-primary">
                              <i className="fa fa-user-circle" />
                            </p>
                          </td>
                          <td>
                            <p className="text-primary">
                              <b>Admin</b> has updated users
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-link"
                              color="info"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="fa fa-share" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>


      <ModalEditProfile
        show={showModal}
        handleClose={handleClose}
        handleUpdateInfo={handleUpdateInfo}
      />

    </div>

  );
}
