import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { toast } from "react-toastify";


import StyledInput from "../StyledInput";
import {
  PWD_REGEX
} from "../ConstRegex";

import { resetPassword } from "../../../redux/apiRequest";
import { getUrlParameter } from "../../../utils/Helper";


const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const key = getUrlParameter('key', location);


  const errRef = useRef();

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirm, setConfirm] = useState("");
  const [validConfirm, setValidConfirm] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidConfirm(password === confirm);
  }, [password, confirm]);

  const handleUpdatePassword = async () => {
    setIsLoading(true);

    if (!validPwd) {
      return setErrMsg("Please enter a valid password");
    }

    if (!validConfirm) {
      return setErrMsg("Password and confirm password should match");
    }

    setErrMsg('');

    const passwordInfo = {
      key: key,
      newPassword: password
    }
    const res = await resetPassword(passwordInfo);
    if (+res?.status === 200) {
      navigate("/login");
      toast.success(res?.message);
    }
    else {
      toast.error(res?.data?.message);
      console.log(`Error: `, res?.data?.message);
    }
    setIsLoading(false);
    return true;
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // handleRegister();
    }
  }

  const isAction = () => {
    return validPwd && validConfirm;
  }


  return (
    <article className='auth-container container mt-3 col-12 col-sm-8 col-lg-4 mx-auto'>

      <h1 className="login-title">Create an account</h1>

      {errMsg &&
        <p className="alert alert-danger" role="alert" ref={errRef} aria-live="assertive" aria-atomic="true">{errMsg}</p>
      }

      <div className="input-password">
        <StyledInput
          type={isShowPassword ? "text" : "password"}
          id="password"
          placeholder="Password (*)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          required
          aria-invalid={!validPwd}
          aria-describedby="password-err"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          valid={+(password.length === 0 || validPwd)}
        />
        <i
          className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
          onClick={() => setIsShowPassword(!isShowPassword)}
          onKeyDown={() => setIsShowPassword(!isShowPassword)}
        ></i>
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
          valid={+(confirm.length === 0 || validConfirm)}
        />
        <i
          className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
          onClick={() => setIsShowPassword(!isShowPassword)}
          onKeyDown={() => setIsShowPassword(!isShowPassword)}
        ></i>
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
        onClick={() => handleUpdatePassword()}
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

export default UpdatePassword;