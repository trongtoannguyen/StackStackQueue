import Table from 'react-bootstrap/Table';
import ForumInfo from '../forumsPage/ForumInfo';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { Container } from 'react-bootstrap';
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



const ListDiscussions = () => {

  const bannerName = "List Discussions";
  const breadcrumbs = [
    { id: 1, name: 'List Discussions', link: '/list-discussion' }
  ];

  const handlePageClick = (event) => {
    console.log(event)
  }

  const DiscussionList = [
    { id: 1, title: 'Welcome to Java', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' },
    { id: 2, title: 'Discussion 2', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' },
    { id: 3, title: 'Discussion 3', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' }
  ]



  return (
    <article className="list-discussion-container content">
      <div className='col-12'>
        <BannerTop
          bannerName={bannerName}
          breadcrumbs={breadcrumbs}
        />
      </div>
      <div className='col-12 my-3'>
        <div className="row d-flex justify-content-between">
          <span className="col-md-6 mb-2 mb-lg-0">
            <span className='filter-name'>Sort by: </span>
            <label htmlFor='recent' className='mx-2'>
              <input type='radio' id='recent' name='sortBy' value="1" /> Most Recent
            </label>
            <label htmlFor='reply' className='mx-2'>
              <input type='radio' id='reply' name='sortBy' value="2" /> Most Recent
            </label>
            <label htmlFor='view' className='mx-2'>
              <input type='radio' id='view' name='sortBy' value="3" /> Most Recent
            </label>
          </span>

          <span className="ml-auto me-0 col-md-3 d-flex align-items-center">
            <label htmlFor="page" className="col-auto">Page size:</label>
            <select id="page" name="page"
              className="form-select"
            >
              <option value="5">05 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </span>
        </div>
      </div>

      <Col md="12">
        <Row>

          <Col md="9">

            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>Discussion Title</th>
                  <th>Replies</th>
                  <th>Views</th>
                  <th>Last Post</th>
                </tr>
              </thead>
              <tbody>
                {DiscussionList?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <h4>
                          <Link to="/discussion/1">{item.title}</Link>
                        </h4>
                        <span>{item.createdBy} </span>
                        <span>{item.createdAt}</span>
                        <span>{item.tags}</span>
                      </td>
                      <td> {item.reply}</td>
                      <td> {item.view}</td>
                      <td> {item.lastPost}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>

            <div className='pagination pagination-end'>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={15}
                previousLabel="< previous"
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
              />
            </div>

          </Col>

          <Col md="3">
            <div className="card">
              <ForumInfo />
            </div>
          </Col>

        </Row>

      </Col>
    </article>
  );
}

export default ListDiscussions;