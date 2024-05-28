import { Card } from 'react-bootstrap';

const UsersBehaviorChart = () => {
    return (
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
    );
}


export default UsersBehaviorChart;