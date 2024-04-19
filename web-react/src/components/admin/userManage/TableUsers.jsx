import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import avatar from "../../../assets/img/default-avatar.png";



function TableUsers() {

  const users =
    [
      {
        id: 1,
        username: "admin123",
        email: "admin@localhost",
        role: "Admin",
        active: true,
      },
      {
        id: 2,
        username: "user123",
        email: "user@localhost",
        role: "User",
        active: true,
      },
      {
        id: 3,
        username: "user223",
        email: "user2@localhost",
        role: "User",
        active: false,
      }
      , {
        id: 4,
        username: "user323",
        email: "user3@localhost",
        role: "User",
        active: false,
      }
    ]

  return (
    <div className='content'>
      <h4>List of Users</h4>
      <Col>
        <Row>
          {users.map((user) => {
            return (

              <Col key={user.id} lg="3" md="6" sm="6">
                <Card
                  color={user.active ? 'primary' : ''}
                  className="card-stats text-dark">
                  <CardBody>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <img src={avatar} alt="avatar" className="avatar" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="">
                          <CardTitle>
                            <Link to="/user/1">{user.username}</Link>
                          </CardTitle>
                          <p className="card-category">{user.email }</p>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <span className="stats">
                      <i className="fas fa-sync-alt" /> Update
                    </span>
                    <span className="stats mx-2">
                      <i className="fas fa-sync-alt" />  Delete
                    </span>
                  </CardFooter>
                </Card>
              </Col>

            )
          })}

        </Row>
      </Col>

    </div>
  )
}

export default TableUsers