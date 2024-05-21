import {
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CardInFo = (props) => {

  return (
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
  );
}


export default CardInFo;