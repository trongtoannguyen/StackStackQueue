import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ForumGroupItem = (props) => {
  const { forumGroup } = props;

  ForumGroupItem.propTypes = {
    forumGroup: PropTypes.object.isRequired,
  };

  return (
    <div className="forum-group-item">
      <Link to={`/forums/${forumGroup.id}`}>
        <h3 className="title">{forumGroup.name}</h3>
        <p>{forumGroup.description}</p>
      </Link>
    </div>
  );
}

export default ForumGroupItem;