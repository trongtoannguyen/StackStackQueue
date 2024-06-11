import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from 'react-bootstrap';

import {
  Card, CardBody,
  Col, Row, Button
} from "reactstrap";
import { toast } from "react-toastify";


import banner from "../../assets/img/damir-bosnjak.jpg";
import BannerTop from '../bannerTop/BannerTop';

import { getUserInfoByUsername, postUpdateInfo, fetchImage } from '../../services/userService/UserService';
import { createAxios } from '../../services/createInstance';
import { loginSuccess } from '../../redux/authSlice';
import noAvatar from "../../assets/img/default-avatar.png";
import { formatDate } from "../../utils/FormatDateTimeHelper";
import { uploadAvatar } from "../../redux/apiUserRequest";

import ActivitiesProfile from "./elements/ActivitiesProfile";
import IntroProfile from './elements/IntroProfile';
import ModalEditImage from "./elements/ModalEditImage";
import ModalEditProfile from "./elements/ModalEditProfile";
import ListBookmark from './elements/ListBookmarkByUser';

const MemberProfile = () => {

  const { username } = useParams();

  const bannerName = "";
  const breadcrumbs = [
    { id: 1, name: `Profile - ${username}`, link: `/member-profile/${username}` }
  ];

  const [key, setKey] = useState('home');  //for tabs, set tab default home

  const [userInfo, setUserInfo] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);

  const [isFollow, setIsFollow] = useState(false);
  const [image, setImage] = useState(null);


  let currentUser = useSelector(state => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);


  const getDataUserInfo = async () => {
    // const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
    const accessToken = currentUser?.accessToken;
    const res = await getUserInfoByUsername(username, axiosJWT, accessToken);
    if (res) {
      setUserInfo(res.data);
      // console.log(`Check user info`, res.data);
    }
    return true;
  };

  const [userEdit, setUserEdit] = useState({
    username: currentUser.username,
    name: userInfo?.name,
    gender: userInfo?.person?.gender,
    birthDate: userInfo?.person?.birthDate,
    address: userInfo?.person?.address,
    phone: userInfo?.person?.phone,
    bio: userInfo?.person?.bio,
    email: userInfo?.email
  });


  const handleClose = () => setShowModal(false);
  const handleCloseImage = () => setShowModalImage(false);

  const handleUploadAvatar = async (file) => {
    if (!file) {
      toast.success("Please select file");
      return;
    }
    const fd = new FormData();
    fd.append('file', file);
    let res = await uploadAvatar(dispatch, currentUser?.accessToken, axiosJWT, fd, currentUser?.username);
    if (res && +res?.status === 200) {
      setImage(res?.data);
      handleCloseImage();
      toast.success("Upload avatar successfully");
    } else {
      toast.error("Upload avatar failed");
    }
    return null;
  }

  const handleUpdateInfo = async (newInfo) => {
    console.log(`Here is new info: `, newInfo);
    let res = await postUpdateInfo(currentUser.accessToken, axiosJWT, newInfo);
    if (res && +res?.status === 200) {
      handleClose();
      toast.success("Update info user successfully");
      setUserInfo(res?.data);
    } else {
      toast.error("Update info user failed");
      console.log(`Update Error`, res.message);
    }
    return null;
  }

  const handleFollow = () => {
    console.log(`handleFollow action`);
    setIsFollow(!isFollow);
  }

  function buttonFollow() {
    if (username === currentUser.username) {
      return (
        <button className="btn ml-auto"
          onClick={() => { setShowModal(true) }}>
          <i className="fa-solid fa-pen-to-square fa-xl"></i>
          <span className='mx-2 d-none d-lg-inline-block'>Edit Profile</span>
        </button>
      );
    }

    if (isFollow) {
      return (
        <button className="btn ml-auto" onClick={handleFollow}>
          <i className="fa-solid fa-user-minus fa-xl"></i>
          <span className="d-none d-lg-inline-block mx-2">UnFollow</span>
        </button>
      )
    }

    return (
      <button className="btn ml-auto" onClick={handleFollow}>
        <i className="fa-solid fa-user-plus fa-xl"></i>
        <span className="d-none d-lg-inline-block mx-2">Follow</span>
      </button>
    )
  }

  const urlAvatarUser = () => {
    if (image) {
      return fetchImage(image);
    }
    if (userInfo.imageUrl) {
      return userInfo.imageUrl;
    }
    if (userInfo.avatar) {
      return fetchImage(userInfo.avatar);
    }

    return noAvatar;
  }



  useEffect(() => {
    if (!currentUser.accessToken) {
      createAxios(currentUser, dispatch, loginSuccess);
    }
    getDataUserInfo();
    urlAvatarUser();

  }, [username]);

  useEffect(() => {
    setUserEdit({
      username: userInfo?.username,
      name: userInfo?.name,
      gender: userInfo?.person?.gender,
      birthDate: userInfo?.person?.birthDate,
      address: userInfo?.person?.address,
      phone: userInfo?.person?.phone,
      bio: userInfo?.person?.bio,
      email: userInfo?.email
    });
  }, [userInfo])





  return (
    <div className="content">
      <Col md="12">
        <BannerTop
          bannerName={bannerName}
          breadcrumbs={breadcrumbs}
        />
      </Col>
      <Col>
        {/* <AccountInfo username={username} userInfo={userInfo} /> */}
        <Card className="card-user">
          <div className="image">
            <img alt="banner" src={banner} />
          </div>
          <CardBody>
            <Row className="py-0">
              <Col md="4" className="author mb-3 h-100">
                <img
                  alt="avatar"
                  className="avatar"
                  src={urlAvatarUser()}
                />
                {username === currentUser.username &&
                  <div onClick={() => setShowModalImage(true)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>
                }
                <h5 className="title">{username}</h5>
                <p className="description">{userInfo?.person?.bio ?? "Introduce yourself"}</p>
              </Col>

              <Col md="8" className='mb-3'>
                <h5 className="title">{userInfo?.name ?? userInfo?.email}</h5>
                <div className="">
                  {userInfo?.badge ? "Badge: " + userInfo?.badge : "Badge: ..."}
                </div>
                <div className="">
                  Start from: {userInfo?.createdAt ? formatDate(userInfo?.createdAt) : ""}
                </div>

                <div className="d-flex justify-content-between col-10">
                  <div>Birthday: {userInfo?.person?.birthDate ? formatDate(userInfo?.person?.birthDate) : "..."}</div>
                  <div className='mx-2'>- Gender: {userInfo?.person?.gender ?? "..."}</div>
                </div>
                <div className=''> Address: {userInfo?.person?.address ?? "..."}</div>

                <div className="d-flex justify-content-between col-10 mt-3">
                  <strong className="text-center">
                    Discussion Count: <br /> {userInfo?.stat?.discussionCount ?? 0}
                  </strong>
                  <strong className="text-center">Comment Count: <br />{userInfo?.stat?.commentCount ?? 0}</strong>
                  <strong className="text-center">Reputation:<br /> {userInfo?.stat?.reputation ?? 0}</strong>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  {buttonFollow()}
                  <Button>
                    <i className="fa-solid fa-message fa-xl"></i>
                    <span className="d-none d-lg-inline-block mx-2">Chat</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Tabs
          id="fill-tab-profile"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Save Bookmark">
            <ListBookmark username={username} />
          </Tab>
          <Tab eventKey="activities" title="Activities">
            <ActivitiesProfile username={username} userInfo={userInfo} />
          </Tab>

          <Tab eventKey="intro" title="Intro">
            <Card>
              <IntroProfile username={username} />
            </Card>
          </Tab>


        </Tabs>

      </Col>


      <ModalEditProfile
        show={showModal}
        handleClose={handleClose}
        handleUpdateInfo={handleUpdateInfo}
        user={userEdit}
      />

      <ModalEditImage
        show={showModalImage}
        handleClose={handleCloseImage}
        handleUpdateAvatar={handleUploadAvatar}
      />


    </div>

  );
}


export default MemberProfile;
