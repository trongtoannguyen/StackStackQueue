import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import PropTypes from 'prop-types';


const LineChartComponent = (props) => {

  const { dataChart, updateData } = props;

  const data = [
    { name: 'Group A', discussions: 400, comments: 2400 },
    { name: 'Group B', discussions: 3000, comments: 1398 },
    { name: 'Group C', discussions: 2000, comments: 9800},
    { name: 'Group D', discussions: 2780, comments: 3908 },
    { name: 'Group E', discussions: 1890, comments: 4800 },
  ];


  return (
    <Card className="card-chart">
      <Card.Header>
        <Card.Title tag="h5">Post Comment by Forum Group</Card.Title>
        <p className="card-category">Line Chart with Points</p>
      </Card.Header>
      <Card.Body
        className="d-flex justify-content-center align-items-center"
        style={{ maxHeight: "300px", width: "100%", overflow: "hidden" }}
      >

        <LineChart width={700} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone"
            dataKey="comments" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone"
            dataKey="discussions" stroke="#82ca9d" />
        </LineChart>


      </Card.Body>
      <Card.Footer>
        {/* <div className="chart-legend">
          <i className="fa fa-circle text-info" /> Tesla Model S{" "}
          <i className="fa fa-circle text-warning" /> BMW 5 Series
        </div> */}
        <hr />
        <div className="card-stats">
          <i className="fa fa-history" /> Updated 3 minutes ago.
        </div>
      </Card.Footer>
    </Card>
  )
}

LineChartComponent.propTypes = {
  dataChart: PropTypes.array,
  updateData: PropTypes.func,
}

export default LineChartComponent;