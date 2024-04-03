import ReactPaginate from "react-paginate";
import { Container, Table } from "react-bootstrap";

import ForumInfo from "../forumsPage/ForumInfo";
import BannerTop from "../layout/BannerTop";


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
    <section className="members-container">
      <BannerTop
        bannerName={bannerName}
        breadcrumbs={breadcrumbs}
      />

      <Container className="row mx-auto mb-3">

        <article className="mb-3 col-12 col-md-8 col-lg-9">
          <div className='pagination pagination-top'>
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
          <Table striped bordered responsive hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Discussion Created</th>
                <th>Comments</th>
                <th>Last Comment</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {memberList?.map((item) => {
                return (
                  <tr key={item.username}>
                    <td>{item.username}</td>
                    <td>{item.discussionCreated}</td>
                    <td>{item.comments}</td>
                    <td>{item.lastComment}</td>
                    <td>{item.joinedDate}</td>
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

        </article>

        {/* right column */}
        <aside className="mb-3 col-12 col-md-4 col-lg-3">

          <div className="card">
            <ForumInfo />
          </div>
        </aside>
      </Container>
    </section>
  );
}

export default MemberList;