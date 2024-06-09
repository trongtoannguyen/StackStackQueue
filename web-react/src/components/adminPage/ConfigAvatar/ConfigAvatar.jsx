import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Col, Row, Card, ListGroup } from "react-bootstrap";

const ConfigAvatar = () => {


  return (
    <article className="dashboard content">
      <h1>ConfigAvatar</h1>

      <section>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col lg="3" md="4" sm="6">
                <Card className="card-stats" style={{ maxHeight: "200px" }}>
                  <Card.Body>
                    <Row>
                      <Col md="4" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="fas fa-user" />
                        </div>
                      </Col>
                      <Col md="8" xs="7">
                        <div className="numbers">
                          <strong className="card-category"
                            style={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipse",
                              overflow: "hidden"
                            }}
                          >Avatar</strong>
                          <Card.Title tag="p">Avatar</Card.Title>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr />
                    <div className="stats">
                      <button className="fas fa-sync-alt" /> Update Now
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </section>
    </article>
  )
}

export default ConfigAvatar;