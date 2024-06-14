import { ChromePicker } from "react-color";
import PropTypes from "prop-types";
const ColorComponents = (props) => {
	const { setColor, color } = props;

	return (
		<div className="form-group mb-3">
			<label className="form-label" htmlFor="title">
				Color
			</label>
			<ChromePicker
				color={color}
				onChangeComplete={(color) => setColor(color.hex)}
			/>
		</div>
	);
};

ColorComponents.propTypes = {
	setColor: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired,
};

export default ColorComponents;
