import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/apiRequest";

import StyledInput from "./StyledInput";

import {
  USER_REGEX,
  EMAIL_REGEX,
  PWD_REGEX
} from "./ConstRegex";
import SocialLogin from "./SocialLogin";


const LoginForm = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);


  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading = useSelector(state => state.auth.login?.isFetching);
  const currentUser = useSelector(state => state.auth.login?.currentUser);
  const error = useSelector(state => state.auth.login?.error);


  useEffect(() => {
    let isUsernameOrEmail = (USER_REGEX.test(username) || EMAIL_REGEX.test(username));
    setValidName(isUsernameOrEmail);
  }, [username]);


  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);




  const handleLogin = async (e) => {
    e.preventDefault(); // Now nothing will happen

    if (!username || !password) {
      errRef.current.focus();
      return toast.error("Please enter email and password");
    }
    const v1 = USER_REGEX.test(username) || EMAIL_REGEX.test(username);
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v3) {
      errRef.current.focus();
      return toast.error('Please enter valid information');
    }

    const loginInfo = {
      username: username.trim(),
      password: password
    }
    loginUser(loginInfo, dispatch);
  }

  const handleKeyDown = (e) => {
    // e.preventDefault();
    if (e.keyCode === 13) {
      handleLogin();
    }
  }

  useEffect(() => {
    if (currentUser?.roles?.length > 0) {
      navigate(-1) === navigate("/unauthorized") ? navigate("/") : navigate(-1);
    }
  }, [currentUser, error, navigate])

  // If the OAuth2 login encounters an error,
  // the user is redirected to the / login page with an error.
  // Here we display the error and then remove the error query parameter from the location.
  useEffect(() => {
    if (location.state?.error) {
      toast.error(location.state.error);
      history.replace({
        pathname: location.pathname,
        state: {}
      })
    }
  }, [location])


  return (
    <article className="auth-container content container mt-3 col-12 col-sm-8 col-lg-4 mx-auto">
      <h1 className="login-title">Welcome back</h1>
      <form onSubmit={handleLogin}>
        <StyledInput type='text'
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Email (*)"
          required
          aria-invalid={!validName}
          aria-describedby="username-err"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          valid={+(username.length === 0 || validName)}
        />
        <small id="username-err" className={userFocus && username || !validName ? "text-danger" : "invalid-feedback"} role="alert" hidden={validName || !userFocus}>
          <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
          Username must be 5-24 characters long and start with a letter.
          Letters, numbers, underscores, hyphens allowed.
        </small>

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
            autoComplete="on"
          />
          <i
            className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick={() => setIsShowPassword(!isShowPassword)}
            onKeyDown={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <small id="password-err" className={pwdFocus && password || !validPwd ? "text-danger" : "invalid-feedback"} role="alert" hidden={validPwd || !pwdFocus}>
          <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
          Password must be 8-24 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.
        </small>
        <div className="forgot-password">
          <Link to="/forgot-password" className='nav-link'>
            <span>Forget password?</span>
          </Link>
        </div>

        <button type="submit"
          className={username && password ? "active mx-auto" : "mx-auto"}
          disabled={username && password ? "" : "disabled"}
        >
          {isLoading && <i className="fas fa-sync fa-spin"></i>}
          &nbsp;Login
        </button>
      </form>
      <div>
        <p className="login-subtitle">Do not have an account?
          <Link to="/register"> Sign Up</Link>
        </p>
      </div>


      <div className="back">
        <Link to="/" className='nav-link'>
          <i className="fa-solid fa-angles-left"></i> <></>
          Back to Home
        </Link>
      </div>
      <hr />

      <SocialLogin />

    </article>
  )
}

export default LoginForm;