

const login = () => {
  return <div className="auth-container">
           <div className="page-header">
           <h1>Login</h1>
           </div>
            <div className="page-content">
            <form method="POST">
              <fieldset>
                <legend>Login or Register</legend>
                <label htmlFor="">
                  <input type="radio" name="loginType" value="loginType"/> Login
                </label>
                <label htmlFor="">
                  <input type="radio" name="Type" value="register"/> Register
                </label>
              </fieldset>
              <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <div className="error"></div>
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <div className="error"></div>
              </div>
              <button className="btn btn-black" type="submit">Submit</button>
            </form>
            </div>
         </div>;
};

export default login;
