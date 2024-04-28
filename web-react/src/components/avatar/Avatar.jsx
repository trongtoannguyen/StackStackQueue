import NoAvatar from "../../assets/img/default-avatar.png";
import PropTypes from 'prop-types';

const Avatar = ({ src, username, height, width }) => {

  return (
    <div className="d-flex-row">
      <img
        src={src ?? NoAvatar}
        alt=""
        style={{
          height: `${height}px`,
          width: `${width}px`,
          objectFit: `cover`,
          borderRadius: `0.5rem`,
        }}
      />
      {username && (
        <span style={{ fontSize: "1rem" }} className="username">
          {username ?? "No name"}
        </span>
      )}
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Avatar;
