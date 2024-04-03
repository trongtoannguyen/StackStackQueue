import DiscussionInfo from './DiscussionInfo';
import BannerTop from '../layout/BannerTop';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { Container } from 'react-bootstrap';


const ViewDiscussion = () => {


  const bannerName = "Java 1";
  const breadcrumbs = [
    { id: 1, name: 'Java', link: '/forums' },
    { id: 2, name: 'Java 1', link: '/discussion/1' }
  ];


  const [isShowAddNew, setIsShowAddNew] = useState(false);

  const handleShow = () => {
    //chuyen den trang cuoi cung
    setIsShowAddNew(true);

  }

  const handleAddNewComment = () => {

  }



  const handlePageClick = (event) => {
    console.log(event)
  }

  return (

    <section className="discussion-details mb-3">

      <BannerTop
        bannerName={bannerName}
        breadcrumbs={breadcrumbs}
      />
      <Container className='mx-auto row'>


      <article className="mb-3 col-12 col-md-8 col-lg-9">
        <section className='mb-3'>
          <div className="card">
            <div className='card-header'>
              <h4>[ICON] Welcome to Java</h4>
              <div>
                Created 5 days ago [1]
              </div>
            </div>
            <div className='card-body'>
              Welcome. Please read forum announcements from forum administrators</div>
            <div className='card-footer '>
              <span>
                <button>Reply</button>
                <button>Quote</button>
              </span>
              <span>
                <button>Like</button>
                <button>Dislike</button>
              </span>
            </div>
          </div>
        </section>
        {isShowAddNew &&
          <section className='card mb-3'>
            <div>
              <b>Add new Comment</b>
              <form>

                <div className="form-group mb-3">
                  <label htmlFor="title">Discussion Title</label>
                  <input type="text" className="form-control" id="title" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="content">Content</label>
                  <textarea className="form-control" id="content" rows="3"></textarea>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="tags">Tags</label>
                  <input type="text" className="form-control" id="tags" />
                </div>
                <div className="mb-3">
                  <button type="reset" className="btn btn-secondary w-25 mx-3"
                    onClick={() => setIsShowAddNew(false)}
                  >Cancel</button>
                  <button type="submit" className="btn btn-primary w-25"
                    onClick={() => handleAddNewComment()}
                  >Submit</button>
                </div>
              </form>
            </div>
          </section>
        }


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
        <div className='card'>
          <button className='btn btn-success' onClick={() => handleShow()}>
            <i className="fa-solid fa-circle-plus"></i><></>
            Add New Comment
          </button>
        </div>
        <div className="card">
          <DiscussionInfo />
        </div>
      </aside>
      </Container>
    </section>

  )
}

export default ViewDiscussion;