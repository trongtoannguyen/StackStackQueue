import { useState, useEffect } from 'react';
import ForumInfo from './ForumInfo';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import BannerTop from '../layout/BannerTop';

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
    <section className="forums-container">
      <BannerTop
        bannerName={bannerName}
        breadcrumbs={breadcrumbs}
      />

      <Container className='container row mx-auto mb-3'>

        <article className="mb-3 col-12 col-md-8 col-lg-9">
          <Table striped bordered responsive hover>
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
                    <td><i className="fa-solid fa-volume-high"></i> <></></td>
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

          <div className="pagination">
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
        <aside className="mb-3 col-12 col-md-4 col-lg-3">
          <div className="card">
            <ForumInfo />
          </div>
        </aside>
      </Container>
    </section>
  )
}

export default ForumGroup;