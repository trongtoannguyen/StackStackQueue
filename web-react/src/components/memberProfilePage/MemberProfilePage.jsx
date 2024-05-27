import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card, CardBody,
  Col,
} from "reactstrap";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import IntroProfile from './IntroProfile';
import BannerTop from '../bannerTop/BannerTop';
import AccountInfo from './AccountInfo';
import ActivitiesProfile from "./ActivitiesProfile";

import { getUserInfoByUsername } from '../../services/UserService';
import { createAxios } from '../../services/createInstance';
import { loginSuccess } from '../../redux/authSlice';

const MemberProfile = () => {

  const { username } = useParams();

  const bannerName = "";
  const breadcrumbs = [
    { id: 1, name: `Profile - ${username}`, link: `/member-profile/${username}` }
  ];

  const [key, setKey] = useState('home');  //for tabs, set tab default home

  const [userInfo, setUserInfo] = useState({});

  let currentUser = useSelector(state => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);


  const getDataUserInfo = async () => {
    const accessToken = currentUser?.accessToken;
    const res = await getUserInfoByUsername(username,axiosJWT,accessToken);
    if (res) {
      setUserInfo(res.data);
      console.log(`Check user info`, res.data);
    }
    return true;
  };


  useEffect(() => {
    if (!currentUser.accessToken) {
      createAxios(currentUser, dispatch, loginSuccess);
    }
    getDataUserInfo();

  }, []);


  return (
    <div className="content">
      <Col md="12">
        <BannerTop
          bannerName={bannerName}
          breadcrumbs={breadcrumbs}
        />
      </Col>
      <Col>
        <AccountInfo username={username} userInfo={userInfo} />
      </Col>
      <Col>
        <Tabs
          id="fill-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Posts in Profile">
            <Card>
              <CardBody>
                Posts in profile
              </CardBody>
            </Card>
          </Tab>
          <Tab eventKey="activities" title="Activities">
            <ActivitiesProfile username={username} />
          </Tab>
          <Tab eventKey="discussions" title="Posts in Forums">
            <Card>
              <CardBody>
                Posts in forum
              </CardBody>
            </Card>

          </Tab>
          <Tab eventKey="intro" title="Intro">
            <Card>
              <IntroProfile username={username} />
            </Card>
          </Tab>


        </Tabs>

      </Col>

    </div>

  );
}


export default MemberProfile;
