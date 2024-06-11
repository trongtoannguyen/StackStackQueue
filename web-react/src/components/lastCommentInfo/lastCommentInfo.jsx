import Avatar from "../avatar/Avatar";
import { Row, Col } from "react-bootstrap";

import { formatDifferentUpToNow } from "../../utils/FormatDateTimeHelper";
import PropTypes from "prop-types";

const LastCommentInfo = (props) => {
	const { comment } = props;

	return (
		<Row>
			<Col md={3}>
				<Avatar username={""} height={50} width={50} />
			</Col>
			<Col md={9}>
				<b>{comment?.title}</b> <br />
				<small>{comment?.contentAbbr}</small> <br />
				<small>
					{comment?.commenter} -{" "}
					{comment?.commentDate
						? formatDifferentUpToNow(comment?.commentDate)
						: ""}
				</small>
			</Col>
		</Row>
	);
};

LastCommentInfo.propTypes = {
	comment: PropTypes.object.isRequired,
};

export default LastCommentInfo;
