import { useState } from "react";
import { useSelector } from "react-redux";

import {
  Card, CardBody,
  Row, Col,
} from "reactstrap";

import ModalEditProfile from "./ModalEditProfile";

import avatar from "../../assets/img/default-avatar.png";
import banner from "../../assets/img/damir-bosnjak.jpg";
import { Button } from "react-bootstrap";


const AccountInfo = () => {

  const currentUser = useSelector(state => state.auth.login?.currentUser);
  const [showModal, setShowModal] = useState(false);


  const handleClose = () => {
    setShowModal(false);
  }

  const handleUpdateInfo = (newInfo) => {
    console.log(`Here is new info: ${newInfo}`);
  }


  return (
    <div>
      <Card className="card-user">
        <div className="image">
          <img alt="banner" src={banner} />
        </div>
        <CardBody>
          <Row>
            <Col md="4" className="author mb-3">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="avatar"
                  className="avatar"
                  src={currentUser.avatar || avatar}
                />
                <h5 className="title">{currentUser?.username}</h5>
              </a>
              <p className="description">{currentUser?.bio ?? "No thing gona change my love for you"}</p>
              <Row className=''>

              </Row>
            </Col>
            <Col md="8" className='mb-3'>
              <h5 className="title">{currentUser?.name ?? currentUser?.email}</h5>
              <p className="">
                {currentUser?.badge || "Chicken"}
              </p>
              <div className="">
                Start from: {currentUser?.createdAt ?? "20-01-2024"}
              </div>
              <p className="description">
                {currentUser?.bio}
              </p>
              <p>Follower: </p>
              <div className="action-buttons">
                <button className="btn btn-primary"
                  onClick={() => { setShowModal(true) }}>
                  <i className="fa-solid fa-pen-to-square fa-xl"></i>
                  <span className='mx-2'>Edit Profile</span>
                </button>

                <Button>Follow</Button>
                <Button>Un-Follow</Button>
                <Button>Chat</Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <ModalEditProfile
        show={showModal}
        handleClose={handleClose}
        handleUpdateInfo={handleUpdateInfo}
      />
    </div>

  )

}

export default AccountInfo;