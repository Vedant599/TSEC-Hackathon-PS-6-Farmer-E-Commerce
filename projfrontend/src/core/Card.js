import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  //   function(f){return f}
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div>
      <div className="card " style={{width:'20rem',height:'35rem',marginTop:'20px'}}>
      <div className="card-header lead"><h4>{cartTitle}</h4></div>
      <div className="card-body">
        {getARedirect(redirect)}
        <center>
        <div className='mx-auto' style={{height:'18rem',}}>
        <ImageHelper product={product}/>
        </div>
        </center>
        <div style={{alignContent:'left',height:'5rem'}}>
        <p className="h5 text-wrap mb-4 mt-2" style={{display:'flex'}}>
          {cartDescrption}
        </p>
        </div>
  <p style={{display:'flex'}}><h5><span style={{textDecoration:'line-through'}}><i class="fa fa-rupee"></i>&nbsp;{cartPrice+30}</span></h5>&nbsp;&nbsp;&nbsp;<h5><i class="fa fa-rupee"></i>&nbsp;{cartPrice} </h5></p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Card;
