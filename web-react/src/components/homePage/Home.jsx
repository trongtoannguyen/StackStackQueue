import ForumInfo from "../forumsPage/ForumInfo";
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
import BannerTop from "../bannerTop/BannerTop";

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




const Home = () => {

  const bannerName = "Welcome to TechForum";
  const breadcrumbs = [];

  return (
    <section className="home-container content mb-3">
      <Col md="12">
        <BannerTop
          bannerName={bannerName}
          breadcrumbs={breadcrumbs}
        />
      </Col>
      <Col md="12">
        <Row>
          <Col md="8">

            <Card>
              <CardHeader>
                <h4 className="stat-name">
                  <i className="fa-regular fa-clock"></i>{" "}
                  Most Recent Discussions
                </h4>
              </CardHeader>
              <CardBody>
                <div className="stat-details">
                  <strong>Welcome to Forum </strong>
                  <span>(0 views) </span>
                  <span>Started By: </span>
                  <strong>admin </strong>
                  <span>- 5 days ago </span>
                  <a href="/tag?id=1000">
                    <span className="button-tag btn btn-success">
                      <i className="fa-solid fa-tag"></i><></>
                      Bulletin
                    </span>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <Link to="/list-discussion">View more ...</Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <h4 className="stat-name">
                  <i className="fa-regular fa-eye"></i>{" "}
                  Most Views Discussions
                </h4>
              </CardHeader>
              <CardBody>
                <div className="stat-details">
                  <strong>Welcome to Forum </strong>
                  <span>(0 views) </span>
                  <span>Started By: </span>
                  <strong>admin </strong>
                  <span>- 5 days ago </span>
                  <a href="/tag?id=1000">
                    <span className="button-tag btn btn-success">
                      <i className="fa-solid fa-tag"></i><></>
                      Bulletin
                    </span>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <Link to="/list-discussion">View more ...</Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <h4 className="stat-name">
                  <i className="fa-regular fa-comments"></i>{" "}
                  Most Comments Discussions
                </h4>
              </CardHeader>
              <CardBody>
                <div className="stat-details">
                  <strong>Welcome to Forum </strong>
                  <span>(0 views) </span>
                  <span>Started By: </span>
                  <strong>admin </strong>
                  <span>- 5 days ago </span>
                  <a href="/tag?id=1000">
                    <span className="button-tag btn btn-success">
                      <i className="fa-solid fa-tag"></i><></>
                      Bulletin
                    </span>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <Link to="/list-discussion">View more ...</Link>
              </CardFooter>
            </Card>

          </Col>

          <Col md="4">
            <Card className="mx-auto text-center p-2">
              <b>
                <i className="fa-regular fa-clock"></i>{" "}
                Discussion Tags
              </b>
            </Card>
            <Card className="h-100">
              <ForumInfo />
            </Card>

          </Col>
        </Row>
      </Col>


    </section>
  );
};

export default Home;