import PropTypes from 'prop-types';
import {
  InputGroup, InputGroupText, InputGroupAddon, Input
} from 'reactstrap';


const SearchFormHeader = ({ color }) => {
  return (
    <form className="col-sm-6 mx-auto">
      <InputGroup className="no-border">
        <Input placeholder="Search..." className={(color === "transparent" ? "text-dark" : "bg-light")} />
        <InputGroupAddon addonType="append">
          <InputGroupText className={color === "transparent" ? "d-inline-block px-3 text-dark" : "d-inline-block px-3 bg-light"}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

SearchFormHeader.propTypes = {
  color: PropTypes.string.isRequired,
};

export default SearchFormHeader;