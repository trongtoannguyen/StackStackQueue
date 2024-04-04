import Table from 'react-bootstrap/Table';
import ForumInfo from '../forumsPage/ForumInfo';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { Container } from 'react-bootstrap';
import BannerTop from '../layout/BannerTop';


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
    <article className="list-discussion-container mt-3">
      <BannerTop
        bannerName={bannerName}
        breadcrumbs={breadcrumbs}
      />
      <Container>
      <div className='filter-top col-12 mb-3 row'>
        <div className='filter-item'>
          <span className='filter-name'>Sort by: </span>
          <label htmlFor='recent'><input type='radio' id='recent' name='sortBy' value="1" /> Most Recent</label>
          <label htmlFor='reply'><input type='radio' id='reply' name='sortBy' value="2" /> Most Recent</label>
          <label htmlFor='view'><input type='radio' id='view' name='sortBy' value="3" /> Most Recent</label>
        </div>

        <div className='filter-item'>
          <span className='filter-name'>Sort Order:</span>
          <button>
            <i className="fa-solid fa-arrow-down-long"></i>
          </button>
          <button>
            <i className="fa-solid fa-arrow-up-long"></i>
          </button>
        </div>

        <div className='filter-item'>
          <span className='filter-name'>Page Size</span>
          <button>10</button>
          <button>20</button>
          <button>50</button>
        </div>

      </div>
      <section className='mx-auto row'>

        <article className="mb-3 col-12 col-md-8 col-lg-9">

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

        </article>

        <aside className="mb-3 col-12 col-md-4 col-lg-3">
          <div className="card">
            <ForumInfo />
          </div>
        </aside>
        </section>
      </Container>
    </article>
  );
}

export default ListDiscussions;