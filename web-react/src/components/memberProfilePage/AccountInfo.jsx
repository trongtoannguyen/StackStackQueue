import { useEffect, useState } from "react";
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


import { formatDate } from "../../utils/FormatHelper";


const AccountInfo = (props) => {

  const { username, userInfo } = props;

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

  const [userEdit, setUserEdit] = useState({
    ...userInfo.person
  });


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

  useEffect(() => {
    setUserEdit(userInfo?.person);
  }, [userInfo])


  return (
    <div>
      <Card className="card-user">
        <div className="image">
          <img alt="banner" src={banner} />
        </div>
        <CardBody>
          <Row className="py-0">
            <Col md="4" className="author mb-3 h-100">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="avatar"
                  className="avatar"
                  src={userInfo?.imageUrl || userInfo?.avatar || avatar}
                />
                <h5 className="title">{username}</h5>
              </a>
              <p className="description">{userInfo?.person?.bio ?? "No thing gona change my love for you"}</p>
            </Col>

            <Col md="8" className='mb-3'>
              <h5 className="title">{userInfo?.name ?? userInfo?.email}</h5>
              <div className="">
                {user?.badge ? "Badge: " + user?.badge : "Badge: Chicken"}
              </div>
              <div className="">
                Start from: {userInfo?.createdAt ? formatDate(userInfo?.createdAt) : "20-01-2024"}
              </div>

              <div className="d-flex justify-content-between col-10">
                <div>Birthday: {userInfo?.person?.birthDate ? formatDate(userInfo?.person?.birthDate) : ""}</div>
                <div>Gender: {userInfo?.person?.gender ?? ""}</div>
                <div>Address: {userInfo?.person?.address ?? ""}</div>
              </div>

              <div className="d-flex justify-content-between col-10 mt-3">
                <strong className="text-center">
                  Discussion Count: <br /> {userInfo?.stat?.discussionCount ?? 0}
                </strong>
                <strong className="text-center">Comment Count: <br />{userInfo?.stat?.commentCount ?? 0}</strong>
                <strong className="text-center">Reputation:<br /> {userInfo?.stat?.reputation ?? 0}</strong>
              </div>
              <div className="d-flex justify-content-end mt-3">
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
        user={userEdit}
      />
    </div>

  )

}


AccountInfo.propTypes = {
  username: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
};


export default AccountInfo;