import PropTypes from 'prop-types';
import Avatar from '../../../avatar/Avatar';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
  const { user } = props;

  return (
    <tr key={user.id}>
      <td>
        <Avatar src="" username="" height={50} width={50} />
      </td>
      <td>
        <Link to='/user-page/1'>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </Link>
      </td>
      <td>{user.role}</td>
      <td>{user.active ? 'Active' : 'Inactive'}</td>
      <td>
        <div className='d-flex justify-content-center'>
          <button className="btn btn-primary">Update</button>
          <button className="btn btn-danger mx-2">Delete</button>
        </div>
      </td>
    </tr>
  );
}


UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserListItem;