import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


import {
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
} from "reactstrap";

// import avatar from "../../../../assets/img/default-avatar.png";
import Avatar from "../../../avatar/Avatar";


const UserCardItem = (props) => {
  const { user } = props;

  return (
    <Col key={user.id} lg="3" md="6" sm="6">
      <Card
        color={user.active ? 'primary' : ''}
        className="card-stats text-dark">
        <CardBody>
          <Row>
            <Col md="4" xs="5">
              <div className="icon-big text-center icon-warning">
                <Avatar src="" username="" height={100} width={100} />
              </div>
            </Col>
            <Col md="8" xs="7">
              <div className="">
                <Link to="/user-page/1">
                  <p className="card-category">{user.username}</p>
                  <p className="card-category">{user.email}</p>
                </Link>
              </div>
            </Col>
          </Row>
        </CardBody>
        <hr />
        <CardFooter className='d-flex justify-content-around'>
          <span className="stats">
            <i className="fas fa-sync-alt" /> Update
          </span>
          <span className="stats mx-2">
            <i className="fa-solid fa-delete-left"></i>  Delete
          </span>
        </CardFooter>
      </Card>
    </Col>);
}

UserCardItem.propTypes = {
  user: PropTypes.object.isRequired,
};


export default UserCardItem;