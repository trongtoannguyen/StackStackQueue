import { useState, useEffect } from 'react';
import ForumInfo from './ForumInfo';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import BannerTop from '../bannerTop/BannerTop';

import { setBgColor } from '../../utils/BgColorHepper';



import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import ListForumInGroup from './ListForumInGroup';



const ForumGroup = (props) => {

  const { activeColor, bgColor } = props;

  const bannerName = "Forums Index";
  const breadcrumbs = [
    { id: 1, name: 'Forums', link: '/forums' }
  ];

  // const [forumGroup, setForumGroup] = useState([]);

  const listForums = [
    { id: 1, name: 'Java', description: 'Java programming language' },
    { id: 2, name: 'JavaScript', description: 'JavaScript programming language' },
    { id: 3, name: 'Python', description: 'Python programming language' }
  ]

  const listForumGroup = [
    {
      id: 1, title: 'Developer', forums: [
        { id: 1, name: 'Java', description: 'Java programming language' },
        { id: 2, name: 'JavaScript', description: 'JavaScript programming language' },
        { id: 3, name: 'Python', description: 'Python programming language' }
      ]
    },
    {
      id: 2, title: 'Forums Group 2', forums: [
        { id: 1, name: 'Java', description: 'Java programming language' },
        { id: 2, name: 'JavaScript', description: 'JavaScript programming language' },
      ]
    },
    {
      id: 3, title: 'Life', forums: [
        { id: 1, name: 'Java', description: 'Java programming language' },
        { id: 2, name: 'JavaScript', description: 'JavaScript programming language' },
        { id: 3, name: 'Python', description: 'Python programming language' }
      ]
    },
  ]

  // Move the setForumGroup(listForums) call to an event handler or JSX attribute
  // For example, you can move it to a useEffect hook to set the forumGroup state when the component mounts

  // useEffect(() => {
  //   setForumGroup(listForums);
  // }, []);

  // const handlePageClick = (event) => {
  //   console.log(event)
  // }

  return (
    <section className="forums-container content">
      <Col md="12">
        <BannerTop
          bannerName={bannerName}
          breadcrumbs={breadcrumbs}
        />
      </Col>

      <Col md="12">
        <Row>
          <Col md={8}>
            {listForumGroup?.map((forumGroup) => {
              return (
                <Card key={forumGroup.id} className='p-0'>
                  <CardHeader className={'h4 ' + setBgColor(activeColor)}>{forumGroup?.title}</CardHeader>
                  <CardBody>
                    <ListForumInGroup forums={forumGroup?.forums} />
                  </CardBody>
                </Card>
              );
            })}
          </Col>
          <Col md={4}>
            <Card className='p-3'>
              <ForumInfo />
            </Card>
          </Col>
        </Row>

      </Col>
    </section>
  )

}

export default ForumGroup;