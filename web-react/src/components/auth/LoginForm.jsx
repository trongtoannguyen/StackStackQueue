import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading = true;


  const handleLogin = async () => {
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  }



  return (
    <article className="login-container container mt-3 col-12 col-sm-8 col-lg-4 mx-auto">
      <h1 className="login-title">Login Form</h1>
      <p className="lead">Please login to continue</p>
      <p className="text-muted">If you do not have an account, you can <Link to="/register">register here</Link></p>

      <input
        type='text'
        placeholder="Email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <div className="input-password">
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <i
          className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
          onClick={() => setIsShowPassword(!isShowPassword)}
          onKeyDown={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? "" : "disabled"}
        onClick={() => handleLogin()}
      >
        {isLoading && <i className="fas fa-sync fa-spin"></i>}
        &nbsp;Login
      </button>


      <div className="back">
        <Link to="/" className='nav-link'>
          <i className="fa-solid fa-angles-left"></i> <></>
          Back to Home
        </Link>
      </div>
      <hr />

      <button className="btn-google">Login with Google</button>
      <button className="btn-facebook">Login with Facebook</button>
    </article>
  )
}

export default LoginForm;