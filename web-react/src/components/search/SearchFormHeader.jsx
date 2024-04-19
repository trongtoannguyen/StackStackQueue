import {
  Form, InputGroup
} from 'react-bootstrap';

const SearchFormHeader = () => {
  return (

    <Form className='col-12 col-lg-auto'>
      <InputGroup>
        <InputGroup.Text id="basic-addon-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon-search"
          className="search-bar"
        />
      </InputGroup>
    </Form>

  );
};

export default SearchFormHeader;