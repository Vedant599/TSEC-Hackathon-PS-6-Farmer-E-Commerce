import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data == null) {
          setValues({ ...values, error: "Data Not Available", success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
        <div style={{margin:'auto',marginTop:'50px',width:'50%'}}>
          <div class="card">
          <div class="card-header">
            <h4>SignUp</h4>
          </div>
          <div class="card-body">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                placeholder={'Name'}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                placeholder={'Email'}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                placeholder={'Password'}
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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

  return (
    <Base title="Hello!" description="Welcome to Commodity Exchange Market">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
