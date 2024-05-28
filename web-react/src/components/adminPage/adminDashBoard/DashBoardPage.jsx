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


  //<i class="fa-solid fa-building-columns"></i>
  const handleUpdateNumber = () => {
    alert(`Update now`);
  }

  return (
    <article className="dashboard content">
      <Row>
        <Col lg="3" md="6" sm="6">
          <CardInfo title={"users"} icon={"fa-solid fa-people-group text-success"} number={10} updateNumber={handleUpdateNumber} />
        </Col>
        <Col lg="3" md="6" sm="6">
          <CardInfo title={"Discussions"} icon={"fa-solid fa-comments text-warning"} number={10} updateNumber={handleUpdateNumber} />
        </Col>
        <Col lg="3" md="6" sm="6">
          <CardInfo title={"comments"} icon={"fa-solid fa-comment text-info"} number={30} updateNumber={handleUpdateNumber} />
        </Col>
        <Col lg="3" md="6" sm="6">
          <CardInfo title={"users"} icon={"fa-solid fa-address-card"} number={1} updateNumber={handleUpdateNumber} />
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