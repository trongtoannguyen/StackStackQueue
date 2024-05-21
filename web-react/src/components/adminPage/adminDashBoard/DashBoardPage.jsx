// import './dashBoard.scss'
// react plugin used to create charts
// import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";


// core components
// import {
//   dashboard24HoursPerformanceChart,
//   dashboardEmailStatisticsChart,
//   dashboardNASDAQChart,
// } from "../variables/charts";

import CardInfo from './CardInfo';
import UsersBehaviorChart from "./UsersBehaviorChart";
import EmailStatisticsChart from "./EmailStatisticsChart";
import LineChart from "./LineChart";


const DashBoard = () => {




  return (
    <article className="dashboard content">
      <Row>
        <Col lg="3" md="6" sm="6">
          <CardInfo />
        </Col>
        <Col lg="3" md="6" sm="6">
          <CardInfo />
        </Col>
        <Col lg="3" md="6" sm="6">
          <CardInfo />
        </Col>
        <Col lg="3" md="6" sm="6">
          <CardInfo />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <UsersBehaviorChart/>

        </Col>
      </Row>
      <Row>
        <Col md="4">
          <EmailStatisticsChart/>
        </Col>
        <Col md="8">
          <LineChart/>
        </Col>
      </Row>

    </article>
  )
}

export default DashBoard;