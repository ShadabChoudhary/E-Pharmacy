import React, { useEffect, useState } from "react";
import "./Header.css";
import { AppBar, Toolbar } from "@mui/material";
import {
  AccountCircleRounded,
  AddShoppingCartOutlined,
  Search,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

function Header() {
  const [data, setData] = useState();
  const [product, setProducts] = useState({});
  const [productName, setProductName] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const getData = await fetch("/api/me");

      const res = await getData.json();

      if (res.success) {
        if (isMounted) setData(res);
      } else {
        setData(null);
      }
      console.log(data);
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [data]);

  const handleClick = async () => {
    const getData = await fetch("/api/logout");
    await getData.json();
    setData(null);
  };

  const getAllProducts = async () => {
    try {
      let isMounted = true;

      console.log(productName);
      const Fetch = await fetch(`/api/products?keyword=${productName}`);
      const response = await Fetch.json();

      if (isMounted) setProducts(response);
      console.log(product);

      return () => {
        isMounted = false;
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <div className="nav-container">
            <Link to="/">
              <div className="logo">
                <img alt="Logo"></img>
              </div>
            </Link>

            <div className="search-panel">
              <div className="search-icon" onClick={getAllProducts}>
                <Search></Search>
              </div>
              <input
                className="input-txt"
                value={productName}
                type="text"
                placeholder="Search for medicines"
                onChange={(e) => setProductName(e.target.value)}
              ></input>
            </div>

            <Link to="/cart" className="cart-container">
              <AddShoppingCartOutlined />
              <p className="cart">Cart</p>
            </Link>

            {data ? (
              <div class="dropdown">
                <button class="dropbtn">{data.user.name}</button>
                <div class="dropdown-content">
                  <span style={{ cursor: "pointer" }} onClick={handleClick}>
                    logout
                  </span>
                </div>
              </div>
            ) : (
              <Link to="/login" className="account-container">
                <AccountCircleRounded />
                <p className="log-reg">Login/register</p>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
