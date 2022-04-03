import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Product_Dpt.css";
import Header from "../components/Header.js";

function ProductDpt() {
  const location = useLocation();
  console.log(location.state);

  const handleClick = (e) => {
    const imgURL = e.target.src;
    const img = document.querySelector(".main_thumbnail");
    img.src = imgURL;
  };
  return (
    <div className="description_container">
      <Header />
      <div className="dpt_container">
        <div className="left_container">
          <div className="small_thumbnail_container">
            {location.state.images.map((img, i) => {
              return (
                <img
                  className="small_thumbnail"
                  onClick={handleClick}
                  src={img.url}
                  alt="p"
                  key={i}
                />
              );
            })}
          </div>
          <div className="main_thumbnail_container">
            <img
              className="main_thumbnail"
              src={location.state.images[0].url}
              alt="i"
            />
          </div>
        </div>
        <div className="right_container">
          <h1 className="title">{location.state.name}</h1>

          <p className="price">MRP: {location.state.price}</p>
          <hr />

          <div className="description">
            <h1 className="description_title">More About this item</h1>
            {location.state.description.split(".").map((dpt) => (
              <ul>
                <li>{dpt}</li>
              </ul>
            ))}
          </div>
          <div className="btn_container">
            <Link to="/product/:id">
              <button className="buy_btn ">Buy Now</button>
            </Link>

            <button className="cart_btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDpt;
