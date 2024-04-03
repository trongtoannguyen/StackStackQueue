import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from "react-router-dom";


const RegisterForm = () => {
  return (
    <article className='login-container container mt-3 col-12 col-sm-8 col-lg-4 mx-auto'>
      <h1>Register Form</h1>
      <p className="text-muted">If you have an account, you can <Link to="/login">login here</Link></p>

      <Form className='col-12 mx-auto'>
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="Username" />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>

        <FloatingLabel controlId="floatingCfmPassword" label="Confirm Password" className="mb-3">
          <Form.Control type="password" placeholder="Confirm Password" />
        </FloatingLabel>

        <button className="btn btn-primary btn-lg mb-3 w-100" type="submit">Register</button>
      </Form>

      <div className="back">
        <Link to="/" className='nav-link'>
          <i className="fa-solid fa-angles-left"></i> <></>
          Back to Home
        </Link>
      </div>
    </article>
  )
}

export default RegisterForm;