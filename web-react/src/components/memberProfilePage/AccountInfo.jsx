import { useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

import {
  Card, CardBody,
  Row, Col,
} from "reactstrap";

import ModalEditProfile from "./ModalEditProfile";

import avatar from "../../assets/img/default-avatar.png";
import banner from "../../assets/img/damir-bosnjak.jpg";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";


const AccountInfo = (props) => {

  const { username } = props;

  const userAuth = useSelector(state => state.auth.login?.currentUser);
  const user = {
    username: username,
    bio: "I love my love",
    avatar: avatar,
    banner: banner,
    id: 1
  }
  const [showModal, setShowModal] = useState(false);
  const [isFollow, setIsFollow] = useState(false);


  const handleClose = () => {
    setShowModal(false);
  }

  const handleUpdateInfo = (newInfo) => {
    alert(`Here is new info: ${newInfo}`);
  }

  const handleFollow = () => {
    console.log(`handleFollow action`);
    setIsFollow(!isFollow);
  }

  return (
    <div>
      <Card className="card-user">
        <div className="image">
          <img alt="banner" src={banner} />
        </div>
        <CardBody>
          <Row>

            <Col md="4" className="author mb-3 h-100">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="avatar"
                  className="avatar"
                  src={user.avatar || avatar}
                />
                <h5 className="title">{user?.username}</h5>
              </a>
              <p className="description">{user?.bio ?? "No thing gona change my love for you"}</p>
            </Col>

            <Col md="8" className='mb-3'>
              <h5 className="title">{user?.name ?? user?.email}</h5>
              <div className="">
                {user?.badge ? "Badge: " + user?.badge : "Badge: Chicken"}
              </div>
              <div className="">
                Start from: {user?.createdAt ?? "20-01-2024"}
              </div>
              <p>Follower: </p>
              <div className="d-flex justify-content-end">
                {username === userAuth?.username &&
                  <Button className="btn btn-primary ml-auto"
                    onClick={() => { setShowModal(true) }}>
                    <i className="fa-solid fa-pen-to-square fa-xl"></i>
                    <span className='mx-2 d-none d-lg-inline-block'>Edit Profile</span>
                  </Button>
                }
                {isFollow ? <Button onClick={handleFollow}>
                  <i className="fa-solid fa-minus fa-xl"></i>
                  <span className="d-none d-lg-inline-block mx-2">UnFollow</span>
                </Button> :
                  <Button onClick={handleFollow}>
                    <i className="fa-solid fa-plus fa-xl"></i>
                    <span className="d-none d-lg-inline-block mx-2">Follow</span>
                  </Button>}

                <Button>
                  <i className="fa-solid fa-message fa-xl"></i>
                  <span className="d-none d-lg-inline-block mx-2">Chat</span>
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <ModalEditProfile
        show={showModal}
        handleClose={handleClose}
        handleUpdateInfo={handleUpdateInfo}
        user={user}
      />
    </div>

  )

}


AccountInfo.propTypes = {
  username: PropTypes.string.isRequired,
};


export default AccountInfo;