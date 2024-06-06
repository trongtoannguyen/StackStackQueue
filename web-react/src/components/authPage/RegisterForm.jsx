import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiRequest";


import StyledInput from "./StyledInput";

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirm,
} from "../../utils/validUtils";
import FormInput from "../formInput/FormInput";


const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);


  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirm, setConfirm] = useState("");
  const [validConfirm, setValidConfirm] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState('');


  const isLoading = useSelector(state => state.auth.login?.isFetching);


  useEffect(() => {
    setValidName(validateName(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(validatePassword(password));
    setValidConfirm(validateConfirm(password, confirm));
  }, [password, confirm]);


  useEffect(() => {
    setErrMsg('');
  }, [username, email, password, confirm]);

  const handleRegister = async () => {
    if (!validateName(username) || !validateEmail(email) || !validatePassword(password)) {
      setErrMsg('Please enter valid information');
      return;
    }

    const registerInfo = {
      username,
      email,
      password
    }
    registerUser(registerInfo, dispatch, navigate);
  }


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleRegister();
    }
  }

  const isAction = () => {
    return validName && validEmail && validPwd && validConfirm;
  }


  return (
    <article className='auth-container container mt-3 col-12 col-sm-8 col-lg-4 mx-auto'>

      <h1 className="login-title">Create an account</h1>

      {errMsg &&
        <p className="alert alert-danger" role="alert" ref={errRef} aria-live="assertive" aria-atomic="true">{errMsg}</p>
      }

      <FormInput
        id="username"
        type="text"
        value={username}
        valid={validName}
        focus={userFocus}
        setFocus={setUserFocus}
        setValue={setUsername}
        validate={validateName}
        placeholder="Username (*)"
        errorMsg="Username must be 5-24 characters long and start with a letter. Letters, numbers, underscores, hyphens allowed."
      />


      <FormInput
        id="email"
        type="text"
        value={email}
        valid={validEmail}
        focus={emailFocus}
        setFocus={setEmailFocus}
        setValue={setEmail}
        validate={validateEmail}
        placeholder="Email address (*)"
        errorMsg="Please enter a valid email address"
      />

      <div className="input-password">
        <StyledInput
          type={isShowPassword ? "text" : "password"}
          id="password"
          placeholder="Password (*)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={!validPwd}
          aria-describedby="password-err"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          valid={+(password.length === 0 || validPwd)}
        />
        <button
          className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
          onClick={() => setIsShowPassword(!isShowPassword)}
          onKeyDown={() => setIsShowPassword(!isShowPassword)}
        ></button>
      </div>
      <small id="password-err"
        className={pwdFocus && password || !validPwd ? "text-danger" : "invalid-feedback"}
        role="alert" hidden={validPwd || !pwdFocus}
      >
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        Password must be 8-24 characters long. <br />
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        And contain at least one lowercase letter, one uppercase letter, one number. <br />
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        And one special character (
        <span aria-label="exclamation mark">! </span>
        <span aria-label="at symbol">@ </span>
        <span aria-label="hashtag"># </span>
        <span aria-label="dollar sign">$ </span>
        <span aria-label="percent">%</span>)
      </small>

      <div className="input-password">
        <StyledInput
          type={isShowPassword ? "text" : "password"}
          id="confirm"
          placeholder="Confirm Password (*)"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          required
          aria-invalid={!validConfirm}
          aria-describedby="confirm-err"
          onFocus={() => setConfirmFocus(true)}
          onBlur={() => setConfirmFocus(false)}
          valid={+(confirm.length===0 ||validConfirm)}
        />
        <button
          className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
          onClick={() => setIsShowPassword(!isShowPassword)}
          onKeyDown={() => setIsShowPassword(!isShowPassword)}
        ></button>
      </div>
      <small id="confirm-err"
        className={confirmFocus && confirm || !validConfirm ? "text-danger" : "invalid-feedback"}
        role="alert" hidden={validConfirm || !confirmFocus}>
        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
        Passwords do not match
      </small>

      <button
        className={isAction() ? "active mx-auto" : "mx-auto"}
        disabled={isAction() ? +false : +true}
        onClick={() => handleRegister()}
      >
        {isLoading && <i className="fas fa-sync fa-spin"></i>}
        &nbsp;Register
      </button>

      <p className="login-subtitle">Do you have an account? <Link to="/login">Sign in</Link></p>



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