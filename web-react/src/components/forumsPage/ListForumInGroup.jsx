import PropTypes from 'prop-types';
// import ForumGroupItem from './ForumGroupItem';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const ListForumInGroup = (props) => {
  const { forums } = props;

  ListForumInGroup.propTypes = {
    forums: PropTypes.object.isRequired,
  };

  // const forumItem = (forum) => {
  //   return (
  //     <ListGroup.Item
  //       as="li"
  //       className="d-flex justify-content-between align-items-start"
  //       key={forum.id}
  //     >
  //       <div className="ms-2 me-auto">
  //         <div className="fw-bold">{forum.name}</div>
  //         {forum.description}
  //       </div>
  //       <Badge bg="primary" pill>
  //         14
  //       </Badge>
  //     </ListGroup.Item>
  //   );
  // }

  return (
    <ListGroup>
      {forums.map((forum) => {
        return (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={forum.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold"><i className="fa-regular fa-comments fa-xl"></i> {forum.name}</div>
              {forum.description}
            </div>
            <Badge bg="primary" pill>
              14
            </Badge>
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  );
}

export default ListForumInGroup;