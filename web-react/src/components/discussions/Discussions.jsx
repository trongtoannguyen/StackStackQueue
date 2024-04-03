import Table from 'react-bootstrap/Table';
import ForumInfo from '../forumsPage/ForumInfo';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import BannerTop from '../layout/BannerTop';

import { Container } from 'react-bootstrap';
import ModalAddDiscussion from './ModalAddDiscussion';
import { useState } from 'react';

const Discussion = () => {

  const bannerName = "Forums Java";
  const breadcrumbs = [
    { id: 1, name: 'Forums Java', link: '/forums' }
  ];

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  }

  const handlePageClick = (event) => {
    console.log(event)
  }

  const DiscussionList = [
    { id: 1, title: 'Java 1', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' },
    { id: 2, title: 'Java 2', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' },
    { id: 3, title: 'Java 3', createdBy: 'John Doe', createdAt: '2021-10-10', tags: 'tag1, tag2', reply: 1, view: 12, lastPost: 'Hana' }
  ]


  const handleUpdateTable = () => {
    console.log('update table')
  }

  return (

    <section className="discussion-container mb-3">
      <BannerTop
        bannerName={bannerName}
        breadcrumbs={breadcrumbs}
      />

      <Container className='mx-auto row'>


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
          <div className='card'>
            <button className="btn btn-success w-100"
              onClick={() => { setShowModal(true) }}>
              <i className="fa-solid fa-circle-plus"></i>
              <span>Open New Discussion</span>
            </button>
          </div>
          <div className="card">
            <ForumInfo />
          </div>
        </aside>
      </Container>

      <ModalAddDiscussion
        show={showModal}
        handleClose={handleClose}
        handleUpdateTable ={handleUpdateTable}
      />
    </section>

  )
}

export default Discussion;