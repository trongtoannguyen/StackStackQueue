import ReactPaginate from "react-paginate";
import ForumInfo from "../forumsPage/ForumInfo";
import BannerTop from "../bannerTop/BannerTop";

import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";



const MemberList = () => {

  const bannerName = "Member List";
  const breadcrumbs = [
    { id: 1, name: 'Members', link: '/members' }
  ];

  const handlePageClick = (event) => {
    console.log(event)
  }

  const memberList = [
    { username: 'admin', discussionCreated: 1, comments: 1, lastComment: '2021-10-10', joinedDate: '2021-10-10' },
    { username: 'user1', discussionCreated: 1, comments: 1, lastComment: '2021-10-10', joinedDate: '2021-10-10' },
    { username: 'user2', discussionCreated: 1, comments: 1, lastComment: '2021-10-10', joinedDate: '2021-10-10' },
    { username: 'user3', discussionCreated: 1, comments: 1, lastComment: '2021-10-10', joinedDate: '2021-10-10' },
    { username: 'user4', discussionCreated: 1, comments: 1, lastComment: '2021-10-10', joinedDate: '2021-10-10' },
    { username: 'user5', discussionCreated: 1, comments: 1, lastComment: '2021-10-10', joinedDate: '2021-10-10' }
  ]


  return (
    <section className="members-container content">
      <Row>
        <Col md-12>
          <BannerTop

            bannerName={bannerName}
            breadcrumbs={breadcrumbs}
          />
        </Col>
        <Col md="12">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Members List</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th className="text-right">Discussion</th>
                        <th className="text-right">Comments</th>
                        <th className="text-right">Last Comment</th>
                        <th className="text-right">Join Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberList?.map((item) => {
                        return (
                          <tr key={item.username}>
                            <td>
                              <Link to="/user/1">{item.username}</Link>
                            </td>
                            <td className="text-right">{item.discussionCreated}</td>
                            <td className="text-right">{item.comments}</td>
                            <td className="text-right">{item.lastComment}</td>
                            <td className="text-right">{item.joinedDate}</td>
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
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="h-100">
                <CardHeader>
                  <CardTitle tag="h4">Forum Info</CardTitle>
                </CardHeader>
                <CardBody>
                  <ForumInfo />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default MemberList;