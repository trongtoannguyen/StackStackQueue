import Table from 'react-bootstrap/Table';
import ForumInfo from '../forumsPage/ForumInfo';
import { NavLink, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { Container } from 'react-bootstrap';


const ListDiscussions = () => {

  const handlePageClick = (event) => {
    console.log(event)
  }

  const DiscussionList = [
    { id: 1, title: 'Welcome to Java', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' },
    { id: 2, title: 'Discussion 2', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' },
    { id: 3, title: 'Discussion 3', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' }
  ]



  return (
    <section className="mt-3 row border">
      <nav className="ui-breadcrumb col-12" aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className="breadcrumb-item">
            <NavLink tag={Link} to="/" className='nav-link'>
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <NavLink tag={Link} to="/forums/discussions" className='nav-link'>
              [name of category/name] Java
            </NavLink>
          </li>
        </ol>
      </nav>
      <span className="banner-page-item col-12 mb-3">
        <div className="title-page">
          <h3>Forums [category/name] Java</h3>
        </div>
      </span>
      <div className='filter-top col-12 mb-3 row'>
        <div className='filter'>
          <span className='filter-name'>Sort by: </span>
          <label htmlFor='recent'><input type='radio' id='recent' name='sortBy' value="1" /> Most Recent</label>
          <label htmlFor='reply'><input type='radio' id='reply' name='sortBy' value="2" /> Most Recent</label>
          <label htmlFor='view'><input type='radio' id='view' name='sortBy' value="3" /> Most Recent</label>
        </div>

        <div className='filter'>
          <span className='filter-name'>Sort Order:</span>
          <button>
            <i className="fa-solid fa-arrow-down-long"></i>
          </button>
          <button>
            <i className="fa-solid fa-arrow-up-long"></i>
          </button>
        </div>

        <div className='filter'>
          <span className='filter-name'>Page Size</span>
          <button>10</button>
          <button>20</button>
          <button>50</button>
        </div>

      </div>
      <Container className='mx-auto row'>

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
      </Container>
    </section>
  );
}

export default ListDiscussions;