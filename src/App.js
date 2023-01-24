import "./App.css";
import { useState } from "react";
import { CartProvider, useCart } from "react-use-cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Customer/HomePage/Home";
import Login from "./Components/Customer/Login";
import Footer from "./Components/Genral/Footer";
import Navbar from "./Components/Genral/Navbar";
import CartPage from "./Components/Customer/Cart/CartPage";
import Cart from "./Components/Customer/Cart/Cart";
import ShopsPage from "./Components/Customer/Shops/ShopsPage";
import Checkout from "./Components/Customer/Checkout/Checkout";
import About from "./Components/Genral/About";
import Privacy from "./Components/Customer/SimplePages/Privacy";
import SafPayment from "./Components/Customer/SimplePages/SafPayment";
import TourInfo from "./Components/Customer/SimplePages/TourInfo";
import Shipping from "./Components/Customer/SimplePages/Shipping";
import Contact from "./Components/Genral/Contact";
import Search from "./Components/Customer/HomePage/Search/Search";
import Detail from "./Components/Customer/SingleProduct/Detail";
// import Checkout from "./Components/Customer/Checkout/Checkout";
import Products from "./Components/Customer/Products/Products";
import SentimentalProducts from "./Components/Customer/SentimentalProducts/SentimentalProducts";
import Signup from "./Components/Customer/Signup";
import ForgotPassword from "./Components/Customer/ForgotPassword";
import CustomerAccount from "./Components/Customer/userDetails";
import Dashboard from "./Components/Customer/Account/pages/Dashboard";
import ShopOwnerSignUp from "./Components/ShopOwner/Signup";
import ShopOwnerLogin from "./Components/ShopOwner/Login";
import Homex from "./Components/Customer/Account/pages/Homex";
import EditProfile from "./Components/Customer/Account/pages/EditProfile";
import Orders from "./Components/Customer/Account/pages/Orders";
import Logout from "./Components/Customer/Account/pages/Logout";
import Homey from "./Components/ShopOwner/Account/pages/Homey";
import AddProduct from "./Components/ShopOwner/Account/pages/AddProduct";
import ShopOwnerEditProfile from "./Components/ShopOwner/Account/pages/ShopOwnerEditProfile";
import ShopOwnerEdit from "./Components/ShopOwner/Account/pages/ShopOwnerEdit";
import ManageOrders from "./Components/ShopOwner/Account/pages/ManageOrders";
import ShopOwnerAnalytics from "./Components/ShopOwner/Account/pages/ShopOwnerAnalytics";
import ShopOwnerDashboard from "./Components/ShopOwner/Account/pages/ShopOwnerDashboard";
import ShopOwnerLogout from "./Components/ShopOwner/Account/pages/ShopOwnerLogout";
import ShopOwnerProductList from "./Components/ShopOwner/Account/pages/ShopOwnerProductList";
import SingleShop from "./Components/Customer/Shops/SingleShop/SingleShop";
import Catgories from "./Components/Customer/Category/Catgories";
import AllCatagoreyPage from "./Components/Customer/Category/AllCatagoreyPage";
import Error from "./Components/Error";
import { Divider } from "@material-ui/core";
import EmailVerify from "./Components/ShopOwner/Verify";
import Navbar2 from "./Components/Navbar/Navbar2";
import ShopResetPassword from "./Components/ShopOwner/ShopResetPassword";
import AllBrandPage from "./Components/Brands/AllBrandPage";
import Brands from "./Components/Brands/Brands";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51MNbzESG2rFLRrIM8cP6C9Op0rv9dZDa1tPehKDuCvVBDgP7xK67KReSvJq3ipBsejS8lrAMZ3TgEi2hEn360gEx00ignv6O1a"
);

function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <Navbar2 /> */}
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="home" element={<Home />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route
              path="/users/:id/verify/:tokenverify"
              element={<EmailVerify />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/safepayment" element={<SafPayment />} />
            <Route path="/tour" element={<TourInfo />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/userDetails" element={<CustomerAccount />} />
            <Route path="/category/:categoryName" element={<Catgories />} />
            <Route path="/brand/:brandName" element={<Brands />} />
            <Route path="/allcatagories" element={<AllCatagoreyPage />} />
            <Route path="/allbrands" element={<AllBrandPage />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/account" element={<Login />} />
            <Route path="/create-account" element={<Signup />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route
              path="/shopowner-reset-password"
              element={<ShopResetPassword />}
            />
            <Route path="/search" element={<Search />} />
            <Route
              path="/singleProduct/:productId/:shopId"
              element={<Detail />}
            />
            <Route
              path="/cart"
              element={
                <Elements stripe={promise}>
                  <CartPage />
                </Elements>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route
              path="/sentimental-products"
              element={<SentimentalProducts />}
            />

            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/singleshop/:shopId/:shopName"
              element={<SingleShop />}
            />

            <Route path="/shopowner-account" element={<ShopOwnerSignUp />} />
            <Route path="/shopowner-login" element={<ShopOwnerLogin />} />
            <Route path="user" element={<Homex />}>
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="customer-orders" element={<Orders />} />
              <Route path="customer-dashboard" element={<Dashboard />} />
              <Route path="logout" element={<Logout />} />
              {/*   <Route path="/productList" element={<ProductList />} /> */}
            </Route>

            <Route path="shopowner" element={<Homey />}>
              <Route path="addproduct" element={<AddProduct />} />
              <Route
                path="edit-profile/:itemId"
                element={<ShopOwnerEditProfile />}
              />
              <Route path="edit-profile" element={<ShopOwnerEdit />} />
              <Route path="manage-orders" element={<ManageOrders />} />
              <Route
                path="shoponwer-analytics"
                element={<ShopOwnerAnalytics />}
              />
              <Route
                path="shoponwer-dashboard"
                element={<ShopOwnerDashboard />}
              />
              <Route path="product-list" element={<ShopOwnerProductList />} />
              <Route path="logout" element={<ShopOwnerLogout />} />
            </Route>
          </Routes>
          <Divider />
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
