import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';

import BannerTop from "../bannerTop/BannerTop";

import { getAllUserStats, getAvatarByUsername } from "../../services/UserStatService";
import { formatDifferentUpToNow } from "../../utils/FormatHelper";

import {
  Row,
} from "reactstrap";
import Pagination from "../pagination/Pagination";

import { fetchAvatarByUsername } from "../../services/UserService";
import noAvatar from '../../assets/img/default-avatar.png';
import Avatar from "../avatar/Avatar";




const MemberList = () => {

  const bannerName = "Member List";
  const breadcrumbs = [
    { id: 1, name: 'Members', link: '/members' }
  ];

  const [userStatList, setUserStatList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [sortBy, setSortBy] = useState('ASC');



  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
    // getDataUserStat();
    return true;
  }


  const handleSort = (sortBy, orderBy) => {
    setSortBy(sortBy);
    setOrderBy(orderBy);
    // getDataUserStat();
    return true;
  }

  const getAvatar = async (username) => {
    let res = await getAvatarByUsername(username);
    if (res?.data && +res?.status === 200) {
      const img = res?.data;
      console.log(`img`, img);
      return img
    }
    return noAvatar;
  }



  const getDataUserStat = useCallback(async () => {
    let pageData = {
      page: page,
      size: pageSize,
      orderBy: orderBy,
      sort: sortBy
    }
    let res = await getAllUserStats(pageData);
    if (res?.data.length > 0) {
      const { pageSize, totalPages, totalItems, data } = res;
      setUserStatList(data);
      setPageSize(pageSize);
      setTotalPages(totalPages);
      setTotalUsers(totalItems);
    }
    return true;
  }, [page, pageSize, orderBy, sortBy]);


  useEffect(() => {
    getDataUserStat();
  }, [page, pageSize, orderBy, sortBy, getDataUserStat]);



  const tableList = (memberList) => {
    if (memberList.length == 0) {
      return (
        <div className="text-center">
          <span className="d-flex justify-content-center">
            <i className="fas fa-sync fa-spin fa-5x"></i>
            <br />
          </span>
          <h5>Loading...</h5>
        </div>
      );
    }
    return (
      <table className="table responsive">
        <thead className="text-primary">
          <tr>
            <th>
              <span>Member&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "createdBy")}
                  onKeyDown={() => { handleSort("DESC", "createdBy") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "createdBy")}
                  onKeyDown={() => { handleSort("ASC", "createdBy") }}
                ></i>
              </span>
            </th>
            <th style={{ textAlign: "right" }}>
              <span>Discussion&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "discussionCount")}
                  onKeyDown={() => { handleSort("DESC", "discussionCount") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "discussionCount")}
                  onKeyDown={() => { handleSort("ASC", "discussionCount") }}
                ></i>
              </span>
            </th>
            <th style={{ textAlign: "right" }}>

              <span>Comments&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "commentCount")}
                  onKeyDown={() => { handleSort("DESC", "commentCount") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "commentCount")}
                  onKeyDown={() => { handleSort("ASC", "commentCount") }}
                ></i>
              </span>
            </th>
            <th style={{ textAlign: "right" }}>
              <span>Join Forum&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "createdAt")}
                  onKeyDown={() => { handleSort("DESC", "createdAt") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "createdAt")}
                  onKeyDown={() => { handleSort("ASC", "createdAt") }}
                ></i>
              </span>
            </th>
            <th style={{ textAlign: "right" }}>
              <span>Reputation&nbsp;</span>
              <span className="d-inline-block">
                <i
                  className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("DESC", "reputation")}
                  onKeyDown={() => { handleSort("DESC", "reputation") }}
                ></i>
                <i
                  className="fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("ASC", "reputation")}
                  onKeyDown={() => { handleSort("ASC", "reputation") }}
                ></i>
              </span>

            </th>
          </tr>
        </thead>
        <tbody>
          {memberList?.map((item) => {
            return (
              <tr key={item?.id}>
                <td>
                  <Link to={"/member-profile/" + item.createdBy} className="text-decoration-none">
                    <Avatar src={fetchAvatarByUsername(item?.createdBy) ?? noAvatar} username={item?.createdBy} height={50} width={50} />
                  </Link>
                </td>
                <td style={{ textAlign: "right" }}>{item?.discussionCount}</td>
                <td style={{textAlign:"right"}}>{item?.commentCount}</td>
                <td style={{ textAlign: "right" }}>{item?.createdAt ? formatDifferentUpToNow(item.createdAt) : ""}</td>
                <td style={{ textAlign: "right" }}> {item?.reputation}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }



  return (
    <section className="members-container content">
      <Row>
        <div className="col-12">
          <BannerTop
            bannerName={bannerName}
            breadcrumbs={breadcrumbs}
          />
        </div>
        <div className="col-12">
          <Row className="px-2">
            <div className="card">
              <div className="card-header">
                <div className="row d-flex justify-content-around">
                  <span className="col-md-4 mb-2 mb-lg-0">
                    <h4>Total: {totalUsers} user(s)/page{ page}</h4>
                  </span>

                  <span className="ml-auto me-0 col-md-2 d-flex align-items-center">
                    <label htmlFor="page" className="col-auto">Page size:</label>
                    <select id="page" name="page"
                      className="form-select"
                      onChange={(e) => setPageSize(e.currentTarget.value)}
                    >
                      <option value="5">05 per page</option>
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                      <option value="50">50 per page</option>
                    </select>
                  </span>
                </div>
              </div>
              <div className="card-body">
                {tableList(userStatList)}

                <Pagination
                  handlePageClick={handlePageClick}
                  pageSize={pageSize}
                  totalPages={totalPages}
                />

              </div>
            </div>
          </Row>
        </div>
      </Row>
    </section>
  );
}

export default MemberList;