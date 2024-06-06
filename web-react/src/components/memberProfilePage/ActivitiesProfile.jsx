import PropTypes from "prop-types";

import Avatar from "../avatar/Avatar";
import {fetchImage } from "../../services/userService/UserService";


const ActivitiesProfile = (props) => {

  const { username, userInfo } = props;



  const activities = [
    { id: 1, name: username, action: 'updated users', time: '5 minutes ago', color: 'info' },
    { id: 2, name: username, action: 'updated users', time: '5 minutes ago', color: 'primary' },
    { id: 3, name: username, action: 'updated users', time: '5 minutes ago', color: 'info' },
    { id: 4, name: username, action: 'updated users', time: '5 minutes ago', color: 'danger' },
    { id: 5, name: username, action: 'updated users', time: '5 minutes ago', color: 'info' },
    { id: 6, name: username, action: 'updated users', time: '5 minutes ago', color: 'warning' },
  ];

  const setColor = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary';
      case 'info':
        return 'text-info';
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-danger';
      default:
        return 'text-primary';
    }
  }


  const urlAvatarUser = () => {
    if (userInfo.imageUrl) {
      return userInfo.imageUrl;
    }
    if (userInfo.avatar) {
      return fetchImage(userInfo.avatar);
    }

    return null;
  }

  return (
    <div className="card card-activities">
      <div className="card-header">Activities History</div>
      <div className="card-body">
        <div className="table-full-width table-responsive">
          <table className="table">
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="col-1">
                    <p className={setColor(activity.color)}>
                      <Avatar src={urlAvatarUser()} username="" height={50} width={50} />
                    </p>
                  </td>
                  <td className="col-auto">
                    <p className={setColor(activity.color)}>
                      <b>{activity?.name}</b> {activity?.action}
                    </p>
                    <small className="text-muted">{activity?.time}</small>
                  </td>
                  <td className={"td-actions " + setColor(activity.color)}>
                    <button
                      className="btn-link"
                      color="info"
                      id="tooltip636901683"
                      title=""
                      type="button"
                    >
                      <i className="fa fa-share" />
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


ActivitiesProfile.propTypes = {
  username: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
};


export default ActivitiesProfile;