import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import {
  InputGroup, InputGroupText, InputGroupAddon, Input
} from 'reactstrap';


const SearchFormHeader = ({ color }) => {

  const [keyword, setKeyword] = useState('');

  const handleSearch = (value) => {
    console.log(`Search for: ${value}`);
  }

  const debounceFn = useCallback(_debounce(handleSearch, 1000), []);

  const handleChange = (event) => {
    setKeyword(event.target.value);
    debounceFn(event.target.value);
  }


  return (
    <form className="col-sm-6 mx-auto">
      <InputGroup className="no-border">
        <Input placeholder="Search..." className={(color === "transparent" ? "text-dark" : "bg-light")}
          name='search'
          value={keyword}
          onChange={handleChange}
        />
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