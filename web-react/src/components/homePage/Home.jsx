import ForumInfo from "../forumsPage/ForumInfo";
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
import BannerTop from "../layout/BannerTop";


const Home = () => {

  const bannerName = "Welcome to TechForum";
  const breadcrumbs = [];

  return (
    <section className="home-container">
      <BannerTop
        bannerName={bannerName}
        breadcrumbs={breadcrumbs}
      />
      <Container className="row mx-auto">
        <article className="mb-3 col-12 col-md-8 col-lg-9">

          <div className="card stat-area mb-3">

            <div className="discussion">
              <h4 className="stat-name">
                <i className="fa-regular fa-clock"></i><></>
                Most Recent Discussions
              </h4>

              <div className="stat-details">
                <strong>Welcome to Forum </strong>
                <span>(0 views) </span>
                <span>Started By: </span>
                <strong>admin </strong>
                <span>- 5 days ago </span>
                <a href="/tag?id=1000">
                  <span className="button-tag btn btn-success">
                    <i className="fa-solid fa-tag"></i><></>
                    Bulletin
                  </span>
                </a>
              </div>
              <Link to="/list-discussion">View more ...</Link>
            </div>

          </div>

          <div className="card stats-area mb-3">

            <div className="discussion">
              <h4 className="stat-name">
                <i className="fa-regular fa-eye"></i><></>
                Most Views Discussions
              </h4>

              <div className="stat-details">
                <strong>Welcome to Forum </strong>
                <span>(0 views) </span>
                <span>Started By: </span>
                <strong>admin </strong>
                <span>- 5 days ago </span>
                <a href="/tag?id=1000">
                  <span className="button-tag btn btn-success">
                    <i className="fa-solid fa-tag"></i><></>
                    Bulletin
                  </span>
                </a>
              </div>
              <Link to="/list-discussion">View more ...</Link>
            </div>
          </div>

          <div className="card stats-area mb-3">
            <div className="discussion">
              <h4 className="stat-name">
                <i className="fa-regular fa-comments"></i><></>
                Most Comments Discussions
              </h4>

              <div className="stat-details">
                <strong>Welcome to Forum </strong>
                <span>(0 views) </span>
                <span>Started By: </span>
                <strong>admin </strong>
                <span>- 5 days ago </span>
                <a href="/tag?id=1000">
                  <span className="button-tag btn btn-success">
                    <i className="fa-solid fa-tag"></i><></>
                    Bulletin
                  </span>
                </a>
              </div>
              <Link to="/list-discussion">View more ...</Link>
            </div>

          </div>

        </article>


        {/* right column */}
        <aside className="mb-3 col-12 col-md-4 col-lg-3">
          <div className="card">
            <b>
              <i className="fa-regular fa-clock"></i> <></>
              Discussion Tags
            </b>
          </div>

          <div className="card">
            <ForumInfo />
          </div>
        </aside>
      </Container>

    </section>
  );
};

export default Home;