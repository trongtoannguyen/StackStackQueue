import {
  Button,
  Card, CardHeader, CardBody,
} from "reactstrap";

import Avatar from "../avatar/Avatar";


const ActivitiesProfile = () => {


  const activities = [
    { id: 1, name: 'Admin', action: 'updated users', time: '5 minutes ago', color: 'info' },
    { id: 2, name: 'Admin', action: 'updated users', time: '5 minutes ago', color: 'primary' },
    { id: 3, name: 'Admin', action: 'updated users', time: '5 minutes ago', color: 'info' },
    { id: 4, name: 'Admin', action: 'updated users', time: '5 minutes ago', color: 'danger' },
    { id: 5, name: 'Admin', action: 'updated users', time: '5 minutes ago', color: 'info' },
    { id: 6, name: 'Admin', action: 'updated users', time: '5 minutes ago', color: 'warning' },
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

  return (
    <Card className="card-activities">
      <CardHeader>Activities History</CardHeader>
      <CardBody>
        <div className="table-full-width table-responsive">
          <table className="table">
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <p className={setColor(activity.color)}>
                      <Avatar height={50} width={50} />
                    </p>
                  </td>
                  <td>
                    <p className={setColor(activity.color)}>
                      <b>{activity?.name}</b> {activity?.action}
                    </p>
                    <small className="text-muted">{activity?.time}</small>
                  </td>
                  <td className={"td-actions "+ setColor(activity.color)}>
                    <Button
                      className="btn-link"
                      color="info"
                      id="tooltip636901683"
                      title=""
                      type="button"
                    >
                      <i className="fa fa-share" />
                    </Button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  )
}

export default ActivitiesProfile;