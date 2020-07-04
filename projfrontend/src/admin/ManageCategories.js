import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-info mt-4" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <table className='table table-bordered table-striped mt-4'>
  <th>Name</th>
  <th>Update</th>
  <th>Delete</th>
          {categories.map((category, index) => {
            return (
              <tr key={index}>
                <td><h3 className="" key={index}>
                {category.name}
              </h3></td>
              <td>
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/productId`}
                >
                  <span className="">Update</span>
                </Link>
              </td>
              <td>
                <button onClick={() => {}} className="btn btn-danger">
                  Delete
                </button>
            </td>
              </tr>
            );
          })}
          
 </table>
    </Base>
  );
};

export default ManageCategories;
