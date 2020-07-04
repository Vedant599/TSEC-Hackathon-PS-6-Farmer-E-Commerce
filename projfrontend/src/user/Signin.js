import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "a@hitesh.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div style={{margin:'auto',marginTop:'65px',width:'50%'}}>
        <div class="card">
          <div class="card-header">
           <h4>SignIn</h4>
          </div>
          <div class="card-body">
          <form>
            
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={handleChange("email")}
                placeholder={"example@gmail.com"}
                className="form-control"
                type="email"
              />
              </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={handleChange("password")}
                placeholder={"Password"}
                className="form-control"
                type="password"
              />
              </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
          </div>
        </div>
          
      </div>
    );
  };

  return (
    <Base title="Holla!" description="Welcome to Commodity Exchange Market">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
