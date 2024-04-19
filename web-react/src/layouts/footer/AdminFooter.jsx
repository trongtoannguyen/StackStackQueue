import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";


function AdminFooter(props) {

  return (
    <footer className={+(props.default) ? "footer footer-default" : "footer"}>
      <Container fluid={(props.fluid) ? true : false}>
        <Row>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Tech Forum
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

AdminFooter.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default AdminFooter;