
import {
  Card, CardBody,
  Col,
} from "reactstrap";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useState } from 'react';
import IntroProfile from './IntroProfile';
import BannerTop from '../../components/bannerTop/BannerTop';
import AccountInfo from './AccountInfo';
import ActivitiesProfile from "./ActivitiesProfile";


export const MyProfile = () => {

  const bannerName = "";
  const breadcrumbs = [
    { id: 1, name: 'Profile', link: '/my-profile' }
  ];


  const [key, setKey] = useState('home');

  return (
    <div className="content">
      <Col md="12">
        <BannerTop
          bannerName={bannerName}
          breadcrumbs={breadcrumbs}
        />
      </Col>
      <Col>
        <AccountInfo />
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
            <ActivitiesProfile />
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
              <IntroProfile />
            </Card>
          </Tab>


        </Tabs>

      </Col>

    </div>

  );
}
