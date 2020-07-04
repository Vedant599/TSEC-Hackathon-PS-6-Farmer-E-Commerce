import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data == null) {
        setError("No Product");
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <div>
      <Base title="All Products" description="Welcome to the Ecommerce Store">

        <div className="row">
          {products.map((product, index) => {
            return (
                <div key={index} className="col-md-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
    </Base>
    </div>
  );
}
