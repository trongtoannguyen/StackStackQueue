import { useState, useEffect } from 'react';
import ForumInfo from './ForumInfo';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import BannerTop from '../bannerTop/BannerTop';



import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";



const ForumGroup = () => {

  const bannerName = "Forums Index";
  const breadcrumbs = [
    { id: 1, name: 'Forums', link: '/forums' }
  ];

  const [forumGroup, setForumGroup] = useState([]);
  const listForums = [
    { id: 1, name: 'Java', description: 'Java programming language' },
    { id: 2, name: 'JavaScript', description: 'JavaScript programming language' },
    { id: 3, name: 'Python', description: 'Python programming language' }
  ]

  // Move the setForumGroup(listForums) call to an event handler or JSX attribute
  // For example, you can move it to a useEffect hook to set the forumGroup state when the component mounts

  useEffect(() => {
    setForumGroup(listForums);
  }, []);

  const handlePageClick = (event) => {
    console.log(event)
  }

  return (
    <section className="forums-container content">
      <Col md="12">
        <BannerTop
          bannerName={bannerName}
          breadcrumbs={breadcrumbs}
        />
      </Col>

      <Col md="12">
        <Row>

          <Col md={8}>
            <Card className='h-100'>
              <div style={{ display: "block", overflow: 'hidden' }}>
                <Table striped responsive hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Category/Name</th>
                      <th>Discussions</th>
                      <th>Comments</th>
                      <th>Last Post</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forumGroup?.map((forum) => {
                      return (
                        <tr key={forum.id}>
                          <td><i className="fa-regular fa-comments fa-xl"></i>{" "}</td>
                          <td>
                            <h4>
                              <Link to="/forums/1">{forum.name}</Link>
                            </h4>
                            <p>{forum.description}</p>
                          </td>
                          <td> 2</td>
                          <td> 20</td>
                          <td> Abc</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='p-3 h-100'>
              <ForumInfo />
            </Card>
          </Col>
        </Row>

      </Col>
    </section>
  )
}

export default ForumGroup;