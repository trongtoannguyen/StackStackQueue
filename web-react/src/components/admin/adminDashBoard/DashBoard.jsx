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


const DashBoard = () => {
  return (
    <article className="dashboard content">
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-globe text-warning" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Capacity</p>
                    <Card.Title tag="p">150GB</Card.Title>
                    <p />
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt" /> Update Now
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-money-coins text-success" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Revenue</p>
                    <Card.Title tag="p">$ 1,345</Card.Title>
                    <p />
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="far fa-calendar" /> Last day
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-danger" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Errors</p>
                    <Card.Title tag="p">23</Card.Title>
                    <p />
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="far fa-clock" /> In the last hour
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Followers</p>
                    <Card.Title tag="p">+45K</Card.Title>
                    <p />
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt" /> Update now
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title tag="h5">Users Behavior</Card.Title>
              <p className="card-category">24 Hours performance</p>
            </Card.Header>
            <Card.Body>
              {/* <Line
                data={dashboard24HoursPerformanceChart.data}
                options={dashboard24HoursPerformanceChart.options}
                width={400}
                height={100}
              /> */}
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Card>
            <Card.Header>
              <Card.Title tag="h5">Email Statistics</Card.Title>
              <p className="card-category">Last Campaign Performance</p>
            </Card.Header>
            <Card.Body style={{ height: "266px" }}>
              {/* <Pie
                data={dashboardEmailStatisticsChart.data}
                options={dashboardEmailStatisticsChart.options}
              /> */}
            </Card.Body>
            <Card.Footer>
              <div className="legend">
                <i className="fa fa-circle text-primary" /> Opened{" "}
                <i className="fa fa-circle text-warning" /> Read{" "}
                <i className="fa fa-circle text-danger" /> Deleted{" "}
                <i className="fa fa-circle text-gray" /> Unopened
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-calendar" /> Number of emails sent
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-chart">
            <Card.Header>
              <Card.Title tag="h5">NASDAQ: AAPL</Card.Title>
              <p className="card-category">Line Chart with Points</p>
            </Card.Header>
            <Card.Body>
              {/* <Line
                data={dashboardNASDAQChart.data}
                options={dashboardNASDAQChart.options}
                width={400}
                height={100}
              /> */}
            </Card.Body>
            <Card.Footer>
              <div className="chart-legend">
                <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                <i className="fa fa-circle text-warning" /> BMW 5 Series
              </div>
              <hr />
              <div className="card-stats">
                <i className="fa fa-check" /> Data information certified
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

    </article>
  )
}

export default DashBoard;