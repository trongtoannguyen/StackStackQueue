import { Link } from "react-router-dom";
import { useCallback } from 'react';

import BannerTop from "../bannerTop/BannerTop";

import { getAllUserStats } from "../../services/UserStatService";
import { formatDifferentUpToNow } from "../../utils/FormatHelper";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";


import Avatar from "../avatar/Avatar";
import { useEffect, useState } from "react";

import Pagination from "../pagination/Pagination";



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
  }, [page, pageSize, orderBy, sortBy])


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
      <Table responsive>
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
            <th className="text-right">
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
            <th className="text-right">

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
            <th className="text-right">
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
            <th className="text-right">
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
                    <Avatar username={item?.createdBy} height={50} width={50} />
                  </Link>
                </td>
                <td className="text-right">{item?.discussionCount}</td>
                <td className="text-right">{item?.commentCount}</td>
                <td className="text-right">{item?.createdAt ? formatDifferentUpToNow(item.createdAt) : ""}</td>
                <td className="text-right"> {item?.reputation}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    );
  }



  return (
    <section className="members-container content">
      <Row>
        <Col md="12">
          <BannerTop
            bannerName={bannerName}
            breadcrumbs={breadcrumbs}
          />
        </Col>
        <Col md="12">
          <Row className="px-2">
            <Card>
              <CardHeader>
                <Row>
                  <span className="col-md-4 mb-2 mb-lg-0">
                    <CardTitle tag="h4">Total: {totalUsers} user(s)</CardTitle>
                  </span>

                  <span className="ml-auto me-0 col-md-2 d-flex align-items-center">
                  </span>

                  <span className="ml-auto me-0 col-md-2 d-flex align-items-center">
                    <label htmlFor="page" className="col-8">Page size:</label>
                    <select id="page" name="page"
                      className="form-select col-4"
                      onChange={(e) => setPageSize(e.currentTarget.value)}
                    >
                      <option value="1">05</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </span>
                </Row>
              </CardHeader>
              <CardBody>
                {tableList(userStatList)}

                <Pagination
                  handlePageClick={handlePageClick}
                  pageSize={pageSize}
                  totalPages={totalPages}
                />

              </CardBody>
            </Card>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default MemberList;