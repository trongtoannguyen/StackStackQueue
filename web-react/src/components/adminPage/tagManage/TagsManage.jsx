import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createAxios } from "../../../services/createInstance";
import { loginSuccess } from "../../../redux/authSlice";

import { getAllTags } from "../../../services/tagService/tagService";

import Table from 'react-bootstrap/Table';
import {
  Card,
  Row,
  Col,
} from "react-bootstrap";


const TagsManage = () => {

  const [tags, setTags] = useState([]);

  let currentUser = useSelector(state => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  const fetchAllTag = useCallback(async () => {
    let res = await getAllTags(currentUser.accessToken, axiosJWT);
    if (+res.status === 200 || +res.data.status === 200) {
      console.log(res?.data?.data);
      setTags(res?.data?.data);
    } else {
      console.log(res?.data?.message);
    }
  }, [currentUser, axiosJWT]);

  useEffect(() => {
    fetchAllTag();
  }, []);


  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Tags Manage</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tag Name</th>
                    <th>Tag Description</th>
                    <th>Sort Order</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tags.length>0 ?
                    tags.map((tag, index) => (
                      <tr key={tag.id}>
                        <td>{index + 1}</td>
                        <td>{tag.name}</td>
                        <td>{tag.description}</td>
                        <td>{tag.sortOrder}</td>
                      </tr>
                    )) :
                    <tr>
                        <td colSpan="4">No data</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TagsManage;