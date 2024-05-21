import { Card } from 'react-bootstrap';

const LineChart = () => {
  return (
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
  )
}

export default LineChart;