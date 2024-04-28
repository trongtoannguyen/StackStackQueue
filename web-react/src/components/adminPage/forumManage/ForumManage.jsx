import {
  Container,
  Col, Row,
  Card,
  ListGroup,
  Badge
} from 'react-bootstrap';


const ForumManage = () => {

  const forumgroups = [
    {
      id: 1,
      title: "Forum 1",
      icon: "fa-regular fa-comments fa-xl",
      color: "info",
      createAt: "2017-01-01",
      group: null
    },
    {
      id: 2,
      title: "Forum 2",
      icon: "fa-regular fa-comments fa-xl",
      color: "info",
      createAt: "2017-01-01",
      group: 1
    },
    {
      id: 3,
      title: "Forum 3",
      icon: "fa-regular fa-comments fa-xl",
      color: "warning",
      createAt: "2017-01-01",
      group: 1
    },
    {
      id: 4,
      title: "Forum 4",
      icon: "fa-regular fa-comments fa-xl",
      color: "info",
      createAt: "2017-01-01",
      group: null
    },
    {
      id: 5,
      title: "Forum 5",
      icon: "fa-regular fa-comments fa-xl",
      color: "primary",
      createAt: "2017-01-01",
      group: null
    },
    {
      id: 6,
      title: "Forum 6",
      icon: "fa-regular fa-comments fa-xl",
      color: "danger",
      createAt: "2017-01-01",
      group: null
    }
  ];

  return (
    <div className="content">
      <Container>
        <Row>

          <Col xs={12} lg={9}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Forum Index</Card.Title>
              </Card.Header>
              <Card.Body>

                <ListGroup as="ol" numbered>
                  {forumgroups.map((forum) => {
                    return (
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={forum.id}
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{ forum?.title}</div>
                          create at : {forum?.createAt}
                        </div>
                        <Badge bg={forum?.color} pill>
                          14
                        </Badge>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>


          <Col xs={12} lg={3}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Forum Info</Card.Title>
              </Card.Header>
              <Card.Body>
                <ListGroup as="ol" numbered>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Subheading</div>
                      Cras justo odio
                    </div>
                    <Badge bg="primary" pill>
                      14
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Subheading</div>
                      Cras justo odio
                    </div>
                    <Badge bg="primary" pill>
                      14
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Subheading</div>
                      Cras justo odio
                    </div>
                    <Badge bg="primary" pill>
                      14
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForumManage;
