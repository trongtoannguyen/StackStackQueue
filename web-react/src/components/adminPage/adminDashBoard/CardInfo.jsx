import {
  Card,
  Row,
  Col,
} from "react-bootstrap";

const CardInFo = (props) => {
  const { title, icon, number, updateNumber } = props;

  const handleUpdateNow = () => {
    updateNumber();
  }

  return (
    <Card className="card-stats">
      <Card.Body>
        <Row>
          <Col md="4" xs="5">
            <div className="icon-big text-center icon-warning">
              <i className={icon} />
            </div>
          </Col>
          <Col md="8" xs="7">
            <div className="numbers">
              <p className="card-category">{ title}</p>
              <Card.Title tag="p">{ number}</Card.Title>
              <p />
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr />
        <div className="stats">
          <i className="fas fa-sync-alt" onClick={handleUpdateNow} /> Update Now
        </div>
      </Card.Footer>
    </Card>
  );
}


export default CardInFo;