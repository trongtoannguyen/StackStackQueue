import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createAxios } from '../../../services/createInstance';
import { loginSuccess } from '../../../redux/authSlice';

import { fetchImage } from "../../../services/userService/UserService";
import { getAllBookmarkByUsername } from "../../../services/userService/userHistory";
import { formatDifferentUpToNow } from "../../../utils/FormatDateTimeHelper";

import Pagination from "../../pagination/Pagination";
import Avatar from "../../avatar/Avatar";


const ListBookmark = (props) => {
  const { username } = props;

  const [listBookmark, setListBookmark] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState('updatedAt');
  const [sortBy, setSortBy] = useState('DESC');


  let currentUser = useSelector(state => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const fetchDataBookmark = async () => {
    let pageData = {
      page: page,
      size: pageSize,
      orderBy: orderBy,
      sort: sortBy,
      username
    }
    let res = await getAllBookmarkByUsername(pageData, axiosJWT, currentUser.accessToken, navigate);
    if (+res?.status === 200) {
      const { pageSize, totalPages, data } = res.data;
      setListBookmark(data);
      setPageSize(pageSize);
      setTotalPages(totalPages);
    } else {
      console.log("error", res?.message);
    }
  }


  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
    return true;
  }

  useEffect(() => {
    fetchDataBookmark();
  }, [username]);


  return (
    <div className="card card-activities">
      <div className="card-header">Save Bookmark List</div>
      <div className="card-body">
        <div className="table-full-width table-responsive">
          <table className="table">
            <tbody>
              {listBookmark.length > 0 ? listBookmark.map((item) => {
                return (
                  <tr key={item.commentId}>
                    <td className="col-1">
                      <p className="">
                        <Avatar src={fetchImage(item.avatar)} username="" height={50} width={50} />
                      </p>
                    </td>
                    <td className="col-auto">
                      <p className="">
                        <b>{item?.author}</b> {item?.firstComment ? " post " : " comment in the thread "}
                        <Link to={`/discussion/${item.discussionId}`} className="text-decoration-none">{item.discussionTitle} </Link>
                        {item?.vote?.voteValue && (item.vote?.voteValue > 0 ? "with vote" : " with downvote ")}
                      </p>
                      <div
                        className="text-muted"
                        dangerouslySetInnerHTML={{ __html: item?.content }}
                      ></div>
                      <small className="text-muted">
                        {item?.author === username ? "" :
                          <Link to={"/member-profile/" + item.author} className="text-decoration-none">{item?.author} </Link>
                        }
                        created at: {item?.createdAt && formatDifferentUpToNow(item?.createdAt)}
                      </small>
                    </td>
                    <td className="col-1">
                      <button
                        className="btn-link"
                        color="info"
                        id="tooltip636901683"
                        title=""
                        type="button"
                      >
                        <i className="fa fa-delete" />
                      </button>
                    </td>
                  </tr>
                )
              }) :
                <tr>
                  <td colSpan="3">
                    <div className="text-center">
                      <h4>No data</h4>
                      <Link to="/list-discussion" className="text-decoration-none">View more</Link>
                    </div>
                  </td>
                </tr>
              }

            </tbody>
          </table>
        </div>
        <Pagination
          handlePageClick={handlePageClick}
          pageSize={+pageSize}
          totalPages={+totalPages}
        />
      </div>
    </div>
  )

}





ListBookmark.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ListBookmark;