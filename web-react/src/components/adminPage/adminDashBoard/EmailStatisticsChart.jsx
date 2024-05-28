import { Card } from 'react-bootstrap';

const EmailStatisticsChart = () => {
  return (
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
  )

}

export default EmailStatisticsChart;