import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


import StyledInput from "./StyledInput";

const Email_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


const ResetPassword = () => {

  const [emailRP, setEmailRP] = useState("");
  const [validEmailRP, setValidEmailRP] = useState(false);
  const [emailRPFocus, setEmailRPFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidEmailRP(Email_REGEX.test(emailRP));
  }, [emailRP]);


  useEffect(() => {
    setErrMsg('');
  }, [emailRP]);


  const handleResetPassword = () => {
    if (!validEmailRP) {
      return setErrMsg("Please enter a valid email address");
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 2000);

  }

  const isAction = () => {
    return validEmailRP;
  }



  return (
    <article className="auth-container container mt-3 col-12 col-sm-8 col-lg-4 mx-auto">
      <h1 className="login-title">Reset Password</h1>
      <p>Please enter your email address to reset your password</p>

      {success && <div className="alert alert-success">Register successfully. Redirecting to login page...</div>}
      {errMsg && <div className="alert alert-danger">{errMsg}</div>}

      <StyledInput
        type='text'
        id="emailRP"
        placeholder="Email address (*)"
        value={emailRP}
        onChange={(e) => setEmailRP(e.target.value)}
        required
        aria-invalid={!validEmailRP}
        aria-describedby="emailRP-err"
        onFocus={() => setEmailRPFocus(true)}
        onBlur={() => setEmailRPFocus(false)}
        isValid={+(emailRP.length===0 || validEmailRP)}
      />
      <small id="emailRP-err" className={emailRPFocus && emailRP || !validEmailRP ? "text-danger" : "invalid-feedback"} role="alert" hidden={validEmailRP || !emailRPFocus}>
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        Please enter a valid email address
      </small>


      <button
        className={isAction() ? "active" : ""}
        disabled={isAction() ? +false : +true}
        onClick={() => handleResetPassword()}
      >
        {isLoading && <i className="fas fa-sync fa-spin"></i>}
        &nbsp;Reset Password
      </button>

      <div className="back">
        <Link to="/" className='nav-link'>
          <i className="fa-solid fa-angles-left"></i> <></>
          Back to Home
        </Link>
      </div>

      <hr />
      <p>If you do not have an account, you can <Link to="/register">register here</Link></p>

    </article>
  )

}


export default ResetPassword;